"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";
import { quizQuestions, scoreAnswers } from "@/lib/pathfinder";

const QuizScreen = dynamic(
  () => import("./quiz-screen").then((m) => m.QuizScreen),
  { loading: () => <QuizSkeleton /> },
);
const ConfirmScreen = dynamic(
  () => import("./confirm-screen").then((m) => m.ConfirmScreen),
  { loading: () => <ConfirmSkeleton /> },
);
const ResultScreen = dynamic(
  () => import("./result-screen").then((m) => m.ResultScreen),
  { loading: () => <ResultSkeleton /> },
);

type Stage = "quiz" | "confirm" | "results";

export function PathfinderClient() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selections, setSelections] = useState<Record<string, string>>({});

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
    setStage("results");
  }, []);

  const retake = useCallback(() => {
    setSelections({});
    setCurrent(0);
    setStage("quiz");
  }, []);

  const results = useMemo(() => {
    if (stage !== "results") return [];
    const all = scoreAnswers(selections);
    return all.slice(0, 3);
  }, [stage, selections]);

  let screen: React.ReactNode;
  if (stage === "quiz" && question) {
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
  } else {
    screen = <ResultScreen results={results} onRetake={retake} />;
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background text-foreground">
      {screen}
    </div>
  );
}

function QuizSkeleton() {
  return (
    <Container className="items-center gap-8">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-2/3 max-w-md" />
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <Skeleton className="size-44 rounded-4xl md:size-48" />
        <Skeleton className="size-44 rounded-4xl md:size-48" />
      </div>
    </Container>
  );
}

function ConfirmSkeleton() {
  return (
    <Container className="items-center gap-4">
      <Skeleton className="h-10 w-2/3 max-w-md" />
      <Skeleton className="h-4 w-80" />
      <div className="flex gap-3">
        <Skeleton className="size-12 rounded-full" />
        <Skeleton className="size-12 rounded-full" />
      </div>
    </Container>
  );
}

function ResultSkeleton() {
  return (
    <Container className="items-center gap-4">
      <Skeleton className="h-10 w-2/3 max-w-md" />
      <Skeleton className="h-4 w-80" />
      <div className="flex w-full flex-col gap-4">
        <ResultCardSkeleton />
        <ResultCardSkeleton />
        <ResultCardSkeleton />
      </div>
    </Container>
  );
}

function ResultCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-4xl border border-border p-4">
      <Skeleton className="size-24 shrink-0 rounded-2xl" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
