import React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function sample3D() {
    if (typeof window !== 'undefined') {//this allows to work only on Client side
        
        //THREE init
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000)
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#bg'),
        })

        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)

        camera.position.setZ(30)

        //UI updating function
        function animate(){
            requestAnimationFrame(animate)

            ring.rotation.x += 0.01
            ring.rotation.y += 0.005
            ring.rotation.z += 0.01

            ring2.rotation.x += 0.005
            ring2.rotation.y += 0.01
            ring2.rotation.z += 0.005

            controls.update

            renderer.render(scene,camera)
        }

        //adding grid to the screen
        const gridHelper = new THREE.GridHelper(200,50)
        scene.add(gridHelper)

        //adding background stars
        function addStar(){
            const geometry = new THREE.SphereGeometry(0.25,24,24)
            const material = new THREE.MeshStandardMaterial( {color:0xffffff})
            const star = new THREE.Mesh(geometry, material)

            const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(500))
            star.position.set(x,y,z)
            scene.add(star)
        }
        Array(500).fill().forEach(addStar)

        //adding planet Mars
        const planetTexture = new THREE.TextureLoader().load('/planet.jpg')
        const planet = new THREE.Mesh(
          new THREE.SphereGeometry( 5, 32, 16 ),
          new THREE.MeshStandardMaterial( { map:planetTexture } )
        )
        scene.add(planet)


        //adding Planet Ring Shape
        const ringTexture = new THREE.TextureLoader().load('/rings.png')
        
        const ring = new THREE.Mesh( 
          new THREE.RingGeometry( 10, 13, 32 ), 
          new THREE.MeshBasicMaterial( {map:ringTexture,side: THREE.DoubleSide} ) 
        );
        scene.add( ring );

        const ringTexture2 = new THREE.TextureLoader().load('/rings2.png')
        const ring2 = new THREE.Mesh( 
          new THREE.RingGeometry( 6, 9, 32 ),
          new THREE.MeshBasicMaterial( {map:ringTexture,side: THREE.DoubleSide} ) 
        );
        scene.add( ring2 );

        //adding a light to the scene
        const pointLight = new THREE.PointLight(0xffffff)
        pointLight.position.set(20,12,20)
        scene.add(pointLight)
        const lightHelper = new THREE.PointLightHelper(pointLight)
        scene.add(lightHelper)

        const ambientLight = new THREE.AmbientLight(0xffffff)
        scene.add(ambientLight)

        //instantiating orbit controls
        const controls = new OrbitControls(camera,renderer.domElement)


        animate()
    }
  return (
    <div>
      <canvas id="bg" style={{position:'fixed',top:0,left:0}}>

      </canvas>
    </div>
  )
}
