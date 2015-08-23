# babylon-skeletonid-test

battlesuit.blend contains two skeletons. BattleSuitArmature is animating the suit (specifically the mesh named *Core*), 
PilotArmature is animating the mesh named *Pilot*.

When exporting battlesuit.blend, using the latest Blender exporter 3.0.2, the .babylon file contains wrong skeletonID 
references.
The skeletons are:

    "skeletons":[
    {"name":"BattleSuitArmature","id":0,"bones":[...],...},
    {"name":"PilotArmature","id":1,"bones":[...],...}
    ]

Yet the skeletonIDs referenced by the meshes are 0 for *Core* (correct) and 4 for *Pilot* (incorrect). The pilot's 
skeleton is not even loaded by BABYLON.SceneLoader.ImportMesh. In the callback function, *Skeleton[]* has a length of 1. 
When I change the pilot's skeletonID to 1 in the .babylon file by hand, everything works as expected.
