import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sparkles } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

interface RealMeteorProps {
  start: [number, number, number];
  end: [number, number, number];
  duration?: number;
  delay?: number;
  color?: string;
  length?: number;
}

function RealMeteor({ start, end, duration = 1.2, delay = 0, color = '#fff', length = 2 }: RealMeteorProps) {
  const group = useRef<THREE.Group>(null);
  const startTime = useRef(performance.now() + delay * 1000);

  // 计算流星轨迹
  const dir = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]).normalize();
  const tailStart = [start[0] - dir.x * length, start[1] - dir.y * length, start[2] - dir.z * length];

  // 线段几何
  const positions = new Float32Array([...tailStart, ...start]);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  useFrame(() => {
    const t = ((performance.now() - startTime.current) / 1000) % duration;
    const progress = t / duration;
    const x = start[0] + (end[0] - start[0]) * progress;
    const y = start[1] + (end[1] - start[1]) * progress;
    const z = start[2] + (end[2] - start[2]) * progress;
    if (group.current) {
      group.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={group}>
      {/* 只渲染尾迹线，不渲染头部小球体 */}
      <line>
        <bufferGeometry attach="geometry" {...geometry} />
        <lineBasicMaterial attach="material" color={color} transparent opacity={0.5} linewidth={2} />
      </line>
    </group>
  );
}

export default function Home3D({ onEnter }: { onEnter: () => void }) {
  const [welcome] = useState('欢迎来到我的3D述职空间！');

  // TODO: 调用AI接口生成欢迎语，setWelcome(结果)

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 星空背景全屏固定 */}
      <Canvas
        className="fixed top-0 left-0 w-screen h-screen z-0"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
        camera={{ position: [0, 0, 8], fov: 60 }}
      >
        {/* 远景星空 */}
        <Stars radius={120} depth={60} count={4000} factor={3} fade speed={1} />
        {/* 柔和星云/光晕 */}
        <mesh>
          <sphereGeometry args={[18, 32, 32]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.08} />
        </mesh>
        {/* 大号发光球体+闪烁点 */}
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
          <mesh position={[0, 0, -2]}>
            <meshStandardMaterial
              color="#f472b6"
              emissive="#fff"
              emissiveIntensity={1.5}
              metalness={0.9}
              roughness={0.15}
              transparent
              opacity={0.7}
            />
          </mesh>
          <Sparkles count={80} scale={6} size={4} color="#fff" speed={1.2} opacity={0.8} />
        </Float>
        {/* 多组流星划过 */}
        <RealMeteor start={[-8, 4, -5]} end={[8, -2, -5]} duration={1.2} color="#fff" length={2.5} />
        <RealMeteor start={[-6, 6, -4]} end={[6, -3, -4]} duration={1.5} delay={0.7} color="#38bdf8" length={2.2} />
        <RealMeteor start={[-7, 2, -6]} end={[7, -1, -6]} duration={1.8} delay={0.3} color="#f472b6" length={2.8} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#f472b6" />
        <OrbitControls enableZoom={false}  autoRotate autoRotateSpeed={0.18} />
      </Canvas>
      {/* 内容区居中 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="glass-card max-w-md w-full mx-auto text-center p-10 animate-fade-in z-10 pointer-events-auto">
          <h1 className="fancy-title mb-8 animate-fade-in">{welcome}</h1>
          <button
            className="glow-btn animate-fade-in"
            onClick={() => { console.log('按钮被点击'); onEnter(); }}
          >
            点击进入
          </button>
        </div>
      </div>
    </div>
  );
}