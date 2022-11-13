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

loops / props array items displayed into buttons / list items for select box options <-

select filter agentID to get route results

AFTER those are selected run API for directions of route
load checkbox for loaded response (direction), direction_id - direction_name

AFTER SELECTED

Load STOPS loop thru for checkbox options

AFTER stop is selected:

Find local time, compare to departure text

if results then display 
if no results then display 'no results'


