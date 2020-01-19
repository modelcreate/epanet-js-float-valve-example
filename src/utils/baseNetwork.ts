export const baseNetwork = `[TITLE]
Float valves simulation in EPANET

[JUNCTIONS]
;ID              	Elev        	Demand      	Pattern         
 1              	0         	0           	                	;
 2             	103.2         	0         	                	;
 3              	103.2         	0         	                	;
 4              	0         	0         	                	;


[RESERVOIRS]
Res 123.2

[TANKS]
;ID              	Elevation   	InitLevel   	MinLevel    	MaxLevel    	Diameter    	MinVol      	VolCurve
 Tank               	100.0         	2.36         	0         	3.2         	9.12        	0           	                	;

[PIPES]
;ID              	Node1           	Node2           	Length      	Diameter    	Roughness   	MinorLoss   	Status
 1.2              1              	  2              	    1       	150          	0.01         	0           	Open  	;
 3.Tank              3              	  Tank             1       	999          	0.01         	0           	Open  	;
Tank.4   Tank 4 1 150 	0.01         	0           	CV  	;

[VALVES]
;ID              	Node1           	Node2           	Diameter    	Type	Setting     	MinorLoss   
Res.1 Res 1 100 TCV 5000 0.001
2.3 2 3  100 PSV 0 0.001


[DEMANDS]
;Junction        	Demand      	Pattern         	Category
4 1.000000 4

[PATTERNS]
4	2.0400	1.8023	1.7116	1.7003	1.5524	1.5076
4	1.5524	1.5188	1.6208	1.5076	1.5076	1.6208
4	1.5076	1.4851	1.4729	1.4851	1.4504	1.5749
4	1.5412	1.6657	1.8023	1.8584	1.7911	1.9717
4	2.2103	2.3460	3.1396	3.7169	2.9580	3.4568
4	3.2640	3.5476	3.2069	3.2303	3.1171	2.9804
4	2.6744	2.9356	3.0376	2.8111	2.6408	2.6183
4	2.9356	2.9917	2.4817	2.7091	2.2777	2.4704
4	2.4143	2.5837	2.4704	2.4592	2.7091	2.7428
4	2.4817	2.7540	2.8448	2.8223	2.7316	2.6857
4	2.7316	2.5837	2.6408	2.7540	2.6520	2.7877
4	3.1957	2.9356	2.2889	2.4480	2.4704	2.4368
4	2.7989	2.9131	2.9804	2.6071	2.7316	2.6744
4	2.7091	2.8897	2.7091	2.5949	2.5051	2.2216
4	2.7652	2.5388	2.2777	2.5388	2.3460	2.5163
4	2.6520	2.2103	2.2664	1.9951	1.8472	1.6208


[TIMES]
Pattern Timestep 0:15
Duration 23:45:00
Hydraulic Timestep 0:15
Quality Timestep 0:15
Pattern Start 0:00
Report Timestep 0:15
Report Start 0:00
Start ClockTime 12:00 AM
Statistic None

[OPTIONS]
Units LPS
Headloss D-W
Trials 500
Accuracy 0.01
UNBALANCED CONTINUE 999



[END]`;
