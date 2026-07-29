# NaraSibolga

A tourism and community site for Sibolga, run by the KKN-PPM UGM student team.

## Language

**Map**: An interactive full-screen page showing tourism locations and recent earthquake hazards around Sibolga. The Map has two views controlled by the MapMode switch: Tourism and Hazard.

**MapMode**: The active view of the Map. Either `tourism` (points of interest) or `hazard` (recent earthquakes from BMKG). _Avoid_: layer, theme.

**Location**:
A visitor-facing place that can be represented by one specific geographic point on the Map. A broader destination and a specific attraction within it may both be Locations when each has a distinct visitor identity; city-wide transport services and tour packages are not Locations.
_Avoid_: Service, package, listing

**LocationCategory**:
A visitor-facing classification that expresses the main role or tourism experience of a Location: Bahari, Tematik, Alam & Panorama, Sejarah & Rekreasi, Akomodasi, Kuliner, or Oleh-Oleh. Every Location has exactly one primary LocationCategory.
_Avoid_: Physical feature, tag, type

**VisitInformation**:
Human-readable facts that help someone evaluate or plan a visit to a Location, such as admission, operating hours, best time, visit duration, check-in, contact details, menus, or products. Its wording and caveats are part of the information.
_Avoid_: Metadata, raw table

**LocationCard**: A list item in the Map sidebar/drawer that represents a single MapItem.

**MapItem**: A normalized item displayed on the Map and in the list, derived from either a tourism Location or an earthquake.

**SelectedItem**: The MapItem whose detail is currently shown and whose marker is focused.

**Gallery**:
A weekly photo recap of the team's time in Sibolga, organised as a grid of photos per week.
_Avoid_: Moments, gallery page (use Gallery for the route/concept, "photo" for a single image)

**Week**:
A numbered unit of the team's fieldwork period (1..7 by default), used as the tab grouping for the Gallery.
_Avoid_: Recap, episode

**Photo**:
A single image in the Gallery, identified by numeric id within its week, with an alt text and an aspect ratio.
_Avoid_: Picture, frame, shot
