window.addEventListener('load', function () {
	var canvas = document.getElementById('renderCanvas');
	var engine = new BABYLON.Engine(canvas, true);

	var scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.2);

	var camera = new BABYLON.ArcRotateCamera('ArcRotateCamera', 0, 0, 0, BABYLON.Vector3.Zero(), scene);
	camera.target.y = 2;
	camera.setPosition(new BABYLON.Vector3(0, 8, -15));
	camera.attachControl(canvas, false);

	var light = new BABYLON.DirectionalLight('Hemi0', new BABYLON.Vector3(0, -1, 0), scene);
	light.intensity = 2;

	BABYLON.SceneLoader.ImportMesh('', 'scene/', 'battlesuit.babylon', scene, function (newMeshes, particleSystems, skeletons) {
		var battlesuitMesh = newMeshes[0];
		var launcherMesh = newMeshes[1];
		var mgMesh = newMeshes[2];
		var engineMesh = newMeshes[3];
		var pilotMesh = newMeshes[4];

		var battlesuitArmature = skeletons[0];

		// this is undefined - unless we change the skeletonID of the pilot from 4 to 1 in the exported battlesuit.babylon
		var pilotArmature = skeletons[1];

		engineMesh.attachToBone(battlesuitArmature.bones[9], battlesuitMesh);
		engineMesh.scaling = new BABYLON.Vector3(-1, 1, 1);
		engineMesh.position = new BABYLON.Vector3(0, 0, 0);
		engineMesh.rotation.x = 3 * Math.PI / 2;
		engineMesh.rotation.z = Math.PI;

		launcherMesh.attachToBone(battlesuitArmature.bones[7], battlesuitMesh);
		launcherMesh.scaling = new BABYLON.Vector3(-1, 1, 1);
		launcherMesh.position = new BABYLON.Vector3(0, 0, 0);
		launcherMesh.rotation.x = Math.PI / 2;
		launcherMesh.rotation.y = Math.PI;

		mgMesh.attachToBone(battlesuitArmature.bones[5], battlesuitMesh);
		mgMesh.scaling = new BABYLON.Vector3(-1, 1, 1);
		mgMesh.position = new BABYLON.Vector3(0, 0, 0);
		mgMesh.rotation.x = Math.PI / 2;
		mgMesh.rotation.y = Math.PI;

		pilotMesh.position = new BABYLON.Vector3(3, 0, -2);
		battlesuitMesh.position = new BABYLON.Vector3(-2, 0, 0);

		scene.beginAnimation(battlesuitArmature, 1, 60, true, 1.0);

		// does not work - unless we change the skeletonID of the pilot from 4 to 1 in the exported battlesuit.babylon
		//scene.beginAnimation(pilotArmature, 1, 60, true, 1.0);
	});

	engine.runRenderLoop(function () {
		scene.render();
	});

	// Watch for browser/canvas resize events
	window.addEventListener('resize', function () {
		engine.resize();
	});
});