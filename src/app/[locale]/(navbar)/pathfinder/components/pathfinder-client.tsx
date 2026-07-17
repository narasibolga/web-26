"use client";

import { Loading01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import {
  matchArchetype,
  quizQuestions,
  rankLocations,
  tallyScores,
} from "@/lib/pathfinder";
import { ConfirmScreen } from "./confirm-screen";
import { IntroScreen } from "./intro-screen";
import { QuizScreen } from "./quiz-screen";
import { ResultIntro } from "./result-intro";

type Stage = "intro" | "quiz" | "confirm" | "results";

const STORAGE_KEY = "pathfinder:result";

type StoredResult = {
  selections: Record<string, string>;
};

export function PathfinderClient() {
  const [storedResult, setStoredResult, hydrated] =
    useLocalStorage<StoredResult | null>(STORAGE_KEY, null);

  const [stage, setStage] = useState<Stage>("intro");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>({});

  // hydrates persisted quiz selections from localStorage after mount; `window` is unavailable during SSR so the value cannot be derived during render.
  useEffect(() => {
    if (hydrated && storedResult) {
      // post-mount hydration from localStorage; value cannot exist during SSR render.
      // react-doctor-disable-next-line react-hooks-js/set-state-in-effect
      setSelections(storedResult.selections);
      // post-mount stage transition tied to the hydrated stored result.
      // react-doctor-disable-next-line react-hooks-js/set-state-in-effect
      setStage("results");
    }
  }, [hydrated, storedResult]);

  const question = quizQuestions[current];
  const total = quizQuestions.length;
  const selectedId = question ? (selections[question.id] ?? null) : null;

  const pick = useCallback(
    (answerId: string) => {
      if (!question) return;
      setSelections((prev) => ({ ...prev, [question.id]: answerId }));
    },
    [question],
  );

  const next = useCallback(() => {
    if (current < total - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
    } else {
      setStage("confirm");
    }
  }, [current, total]);

  const previous = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
    }
  }, [current]);

  const submit = useCallback(() => {
    setStoredResult({ selections });
    setStage("results");
  }, [selections, setStoredResult]);

  const retake = useCallback(() => {
    setStoredResult(null);
    setSelections({});
    setCurrent(0);
    setStage("quiz");
  }, [setStoredResult]);

  const resolved = useMemo(() => {
    if (stage !== "results") return null;
    return matchArchetype(tallyScores(selections));
  }, [stage, selections]);

  const results = useMemo(() => {
    if (!resolved) return [];
    return rankLocations(resolved.totals, 6);
  }, [resolved]);

  if (!hydrated) {
    return (
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center gap-2 text-muted-foreground">
        <HugeiconsIcon icon={Loading01Icon} className="animate-spin" />
      </div>
    );
  }

  let screen: React.ReactNode;
  if (stage === "intro") {
    screen = <IntroScreen onStart={() => setStage("quiz")} />;
  } else if (stage === "quiz" && question) {
    screen = (
      <QuizScreen
        question={question}
        questionNumber={current + 1}
        total={total}
        selected={selectedId}
        direction={direction}
        onPick={pick}
        onPrevious={previous}
        onNext={next}
        isFirst={current === 0}
      />
    );
  } else if (stage === "confirm") {
    screen = (
      <ConfirmScreen
        onBack={() => {
          setCurrent(total - 1);
          setStage("quiz");
        }}
        onSubmit={submit}
      />
    );
  } else if (stage === "results" && resolved) {
    screen = (
      <ResultIntro resolved={resolved} results={results} onRetake={retake} />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-foreground">
      {screen}
    </div>
  );
}
