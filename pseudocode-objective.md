In a language of your choice, write a program which will tell you how long it is until the next bus 
on “BUS ROUTE” leaving from “BUS STOP NAME” going “DIRECTION” using the api defined 
at http://svc.metrotransit.org/ 
 
“BUS ROUTE” will be a substring of the bus route name which is only in one bus route  
 
“BUS STOP NAME” will be a substring of the bus stop name which is only in one bus stop on 
that route  
 
“DIRECTION” will be “north” “east” “west” or “south”  
 
Eg, if you wanted to know the next bus leaving from our Brooklyn Park campus to our downtown 
campus: 
 
$ go run nextbus.go “Express -Target -Hwy 252 and 73rd Av P&R -Mpls” “Target North Campus 
Building F” “south”2 Minutes 
 
(note that that won’t return anything if the last bus for the day has already left) 
 
Or if you wanted to take the light rail from downtown to the Mall of America or the Airport:$ 
nextbus.py “METRO Blue Line” “Target Field Station Platform 1” “south”8 Minutes 

---

BUS ROUTE -- substring only in one bus route
    - get bus routes
    - set them in array / return names 
BUS STOP NAME -- substring only in one bus stop on route
DIRECTION -- cardinal directions NEWS

Select a stop, select a destination, (direction?)

Return no results or when the next bus is due

--------

pull agency and route on load
https://svc.metrotransit.org/nextripv2/agencies
https://svc.metrotransit.org/nextripv2/routes

put those options into an arrays -- Done

loops / props array items displayed into buttons / list items for select box options -- Done

select filter agentID to get route results -- Done

AFTER those are selected run API for directions of route -- done
load checkbox for loaded response (direction), direction_id - direction_name -- done

AFTER SELECTED -- done

Load STOPS loop thru for checkbox options -- done

AFTER stop is selected: -- done

Find local time, compare to departure text <- comparison not needed, API gives departure time

if results then display <- done
if no results then display 'no results' <- in progress

Wishlist: 
1) better scaling / positioning / general styling of UI
2) able to search point A to point B instead of needing route and direction, but thats API limitation. Could rewrite queries if internal database but for this activity this met all the check-marks but still had some extra stuff.
3) More / improved conditionals. Desire for UX to be as high as possible.
4) refactor and make code drier if possible. Acceptable with where its at but never hurts.
5) rename variables, functions, elements better. 
6) Better Accessibility features.

