"use client";

import { Leva, useControls } from "leva";
import { useMemo, useState } from "react";
import { useRef } from "react";
import { FidgetSpinner } from "react-fidget-spinner";
import { useDebounceCallback } from "usehooks-ts";
import Confetti from "react-dom-confetti";
import { useEffect } from "react";
import Image from "next/image";
const colours = [
  { name: "yellow", value: "#F3D173" },
  { name: "gray", value: "#CBCBCB" },
  { name: "blue", value: "#7395f3" },
  { name: "red", value: "#f39173" },
  { name: "lime", value: "#d5f373" },
  { name: "purple", value: "#d173f3" },
  { name: "teal", value: "#73f3d1" },
];

enum ControlName {
  Spinner = "Spinner",
  Bubbles = "Bubbles",
  Sparks = "Sparks",
  Vibes = "Vibes",
}

export default function Home() {
  const spinner = useControls(
    ControlName.Spinner,
    {
      emoji: { value: "🦧", label: "Text/Emoji" },
      size: { value: 2, min: 0, max: 5, label: "Size" },
    },
    { color: colours[0].value }
  );

  const bubbles = useControls(
    ControlName.Bubbles,
    {
      emoji: { value: "oo oo ", label: "Text/Emoji" },
      emoji2: { value: "ee ee", label: "Text/Emoji" },
      emoji3: { value: "ah ah", label: "Text/Emoji" },
    },
    { color: colours[2].value }
  );

  const sparks = useControls(
    ControlName.Sparks,
    {
      emoji: { value: "🥜", label: "Text/Emoji" },
      emoji2: {
        value: "🍌",
        label: "Text/Emoji",
      },
      emoji3: {
        value: "",
        label: "Text/Emoji",
      },
    },
    { color: colours[6].value }
  );

  const vibes = useControls(
    ControlName.Vibes,
    {
      background: { value: colours[5].value, label: "Background" },
      branding: { value: true, label: "Branding" },
    },
    { color: colours[3].value }
  );

  const scaleRef = useRef(1);

  const [isExploding, setIsExploding] = useState(false);

  const onScaleChange = (scale: number, audioPath: string) => {
    if (scale > scaleRef.current) {
      const audio = new Audio(audioPath);
      audio.play().catch(console.error);
    }
    scaleRef.current = scale;
  };

  const debouncedOnScaleChange = useDebounceCallback(onScaleChange, 100);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isExploding) {
      timeout = setTimeout(() => {
        setIsExploding(false);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [isExploding]);

  const velocityBreakpoints = useMemo(() => {
    const scaleRange = [1, 5];
    const breakpointRange = [0.1, 0.9];
    const audioPaths = [
      "/JetSetRadio_0.mp3",
      "/JetSetRadio_1.mp3",
      "/JetSetRadio_2.mp3",
      "/JetSetRadio_3.mp3",
      "/JetSetRadio_4.mp3",
      "/JetSetRadio_5.mp3",
      "/JetSetRadio_6.mp3",
    ];

    const breakpoints = audioPaths.map((audioPath, index) => {
      const breakpoint =
        breakpointRange[0] +
        (index * (breakpointRange[1] - breakpointRange[0])) /
          (audioPaths.length - 1);
      const scale =
        scaleRange[0] +
        (index * (scaleRange[1] - scaleRange[0])) / (audioPaths.length - 1);

      const isLast = index === audioPaths.length - 1;

      return {
        breakpoint,
        config: {
          scaleConfig: {
            onScaleChange: (scale: number) => {
              debouncedOnScaleChange(scale, audioPath);
              if (isLast) {
                setIsExploding(true);
              }
            },
            scale,
          },
        },
      };
    });

    return breakpoints;
  }, [debouncedOnScaleChange]);

  return (
    <>
      <Leva
        titleBar={{ title: "make your own fidget spinner!" }}
        collapsed={true}
      />
      <div
        className="font-[family-name:var(--font-geist-sans)] w-screen h-screen flex flex-col items-center justify-between overflow-hidden py-50 px-10"
        style={{ background: vibes.background }}
      >
        <Wrapper>{null}</Wrapper>
        <div className="size-4">
          <Confetti active={isExploding} />

          <FidgetSpinner
            scaleConfig={{
              onScaleChange: (scale) => {
                onScaleChange(scale, "/JetSetRadio_0.mp3");
              },
            }}
            bubbleConfig={{
              active: false,
              components: [bubbles.emoji, bubbles.emoji2, bubbles.emoji3],
            }}
            sparkConfig={{
              active: false,
              components: [sparks.emoji, sparks.emoji2, sparks.emoji3],
            }}
            spinnerConfig={{
              maxAngularVelocity: 100,
            }}
            velocityBreakpoints={velocityBreakpoints}
          >
            <div
              className="text-4xl font-bold select-none relative"
              style={{ transform: `scale(${spinner.size})` }}
            >
              {spinner.emoji}
            </div>
          </FidgetSpinner>
        </div>
        <Wrapper>{vibes.branding && <Branding />}</Wrapper>
      </div>
    </>
  );
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-10">{children}</div>;
};

const Branding = () => {
  return (
    <a href="https://www.npmjs.com/package/react-fidget-spinner">
      <div className="flex gap-4">
        <span className="text-sm font-mono">react-fidget-spinner</span>
        <Image
          src="https://img.shields.io/npm/v/react-fidget-spinner.svg"
          alt="npm version"
          width={80}
          height={20}
        />
      </div>
    </a>
  );
};
