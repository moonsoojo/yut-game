import React, { useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";


export function VaniAvatar(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF("models/vaniAvatar.glb");
    const { animations: sittingAnimation } = useFBX("animations/sitting.fbx");
    sittingAnimation[0].name = "sitting";

    const { actions } = useAnimations(sittingAnimation, group);

    useEffect(() => {
        actions['sitting'].reset().fadeIn(0.5).play()
        return() => {
            actions['sitting'].reset().fadeOut(0.5);
        }
    }, [])

    return (
        <group {...props} ref={group} dispose={null}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            frustumCulled={false}
        />
        <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            frustumCulled={false}
        />
        <skinnedMesh
            name="Wolf3D_Head"
            geometry={nodes.Wolf3D_Head.geometry}
            material={materials.Wolf3D_Skin}
            skeleton={nodes.Wolf3D_Head.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
            frustumCulled={false}
        />
        <skinnedMesh
            name="Wolf3D_Teeth"
            geometry={nodes.Wolf3D_Teeth.geometry}
            material={materials.Wolf3D_Teeth}
            skeleton={nodes.Wolf3D_Teeth.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
            frustumCulled={false}
        />
        <skinnedMesh
            geometry={nodes["hair-60"].geometry}
            material={materials.M_Hair_60}
            skeleton={nodes["hair-60"].skeleton}
            frustumCulled={false}
        />
        <skinnedMesh
            name="Wolf3D_Outfit_Top"
            geometry={nodes.Wolf3D_Outfit_Top.geometry}
            material={materials.Wolf3D_Outfit_Top}
            skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Outfit_Top.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Outfit_Top.morphTargetInfluences}
            frustumCulled={false}
        />
        <skinnedMesh
            name="Wolf3D_Outfit_Bottom"
            geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
            material={materials.Wolf3D_Outfit_Bottom}
            skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Outfit_Bottom.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Outfit_Bottom.morphTargetInfluences}
            frustumCulled={false}
        />
        <skinnedMesh
            name="Wolf3D_Outfit_Footwear"
            geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
            material={materials.Wolf3D_Outfit_Footwear}
            skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            morphTargetDictionary={
            nodes.Wolf3D_Outfit_Footwear.morphTargetDictionary
            }
            morphTargetInfluences={
            nodes.Wolf3D_Outfit_Footwear.morphTargetInfluences
            }
            frustumCulled={false}
        />
        <skinnedMesh
            name="Wolf3D_Body"
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Body.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Body.morphTargetInfluences}
            frustumCulled={false}
        />
    </group>
  );
}

useGLTF.preload("models/vaniAvatar.glb");
