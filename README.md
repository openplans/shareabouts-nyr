Shareabouts for NY Rising
==================


Map updates 
------------


Updating the map involves the following steps:

* Updating the tiles
* Transferring corridor names to the roadway segments
* Updating attributes for the assets
* Combining roads and assets into a single geojson

Step by step:

0. PB will send over new shapefiles for assets and overlays. Save the zip here in Dropbox:

  `projects/150 NY Rising/data/assets/originals from PB/DATE RW_Assets`
 
0. Open TileMill and remove the asset and overlay layers. Keep the css. If you don't do this, TileMill may freak out when the files change.

0. Make a new dated asset folder. Unzip and move the new shapefiles into it like this:

  `projects/150 NY Rising/data/assets/RE/20131029`

0. Check the new files:
  
   -- Any zero or null IDs?
   
   -- Do they open in qgis and look ok?
   
   -- Anything that's not going to work on the map?

0. Update TileMill -- add in `assets` and `overlay` layers using the new shapefiles. Move them below buildings. Order: #studyarea, #overlay, #building, #assets, #street, #counties, #shoreline. Export the new tiles.

0. __Copy__ the road segment file from the previous dated asset folder, into the `to merge` subdirectory e.g from `assets/RE/20131018/to merge/roadbed.shp` to `assets/RE/20131029/to merge/road.shp`.

0. In gqis, make sure the segments beneath the corridors/overlay shapes are updated with the correct name. Check for any segments that need to be split or drawn in. Set `ASSET_CLAS` to `ROAD` for anything new, copy over `Zone` and `ASSET` too.

0. Move anything that should be clickable into its own shapefile in `to merge`:

  -- For RW, put `ROCKAWAY BOARDWALK` into its own file.

0. From assets, select `ASSET_CLAS is null`, update to `NONE`. Copy the assets shapefile into `to merge`.

0. Run `Merge shapefiles into one`. 

0. TODO: merging

0. TODO: numbering the roadways etc -- do we need to do this? how will I pull out the road sections that have been updated?



Replies to participants
-----------

**In response to Corrections**

[name], thank you for sharing this correction. We will make sure the corrected community asset information is included in the community recovery plan.


**In response to Issues**

[name], thank you for sharing this issue. Your comment will be considered by your community’s Planning Committee as it identifies local needs and potential projects for the final Community Reconstruction Plan.


Credits
-------------
Shareabouts is a project of [OpenPlans](http://openplans.org).
