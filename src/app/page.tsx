"use client";

import { Leva, useControls } from "leva";
import { useMemo, useState } from "react";
import { useRef } from "react";
import { FidgetSpinner } from "react-fidget-spinner";
import { useDebounceCallback } from "usehooks-ts";
import Confetti from "react-dom-confetti";
import { useEffect } from "react";
import Image from "next/image";
import { spinnerConfigs } from "./config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

const defaultConfig = {
  spinner: {
    emoji: "🦧",
    size: 2,
  },
  bubbles: {
    emoji: "oo oo",
    emoji2: "oo oo",
    emoji3: "oo oo",
  },
  sparks: {
    emoji: "🥜",
    emoji2: "🍌",
    emoji3: "",
  },
  vibes: {
    background: colours[5].value,
    showAuthor: true,
    author: "Rick",
  },
};

export default function Home() {
  const [config, setConfig] = useState(defaultConfig);

  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const isHidden = !isOpen;

  const randomise = () => {
    const newConfig =
      spinnerConfigs[Math.floor(Math.random() * spinnerConfigs.length)];
    setConfig(newConfig);
    setSpinner(newConfig.spinner);
    setBubbles(newConfig.bubbles);
    setSparks(newConfig.sparks);
    setVibes(newConfig.vibes);
  };

  const [spinner, setSpinner] = useControls(
    ControlName.Spinner,
    () => ({
      emoji: { value: config.spinner.emoji, label: "Text/Emoji" },
      size: { value: config.spinner.size, min: 0, max: 5, label: "Size" },
    }),
    { color: colours[0].value }
  );

  const [bubbles, setBubbles] = useControls(
    ControlName.Bubbles,
    () => ({
      emoji: { value: config.bubbles.emoji, label: "Text/Emoji" },
      emoji2: { value: config.bubbles.emoji2, label: "Text/Emoji" },
      emoji3: { value: config.bubbles.emoji3, label: "Text/Emoji" },
    }),
    { color: colours[2].value }
  );

  const [sparks, setSparks] = useControls(
    ControlName.Sparks,
    () => ({
      emoji: { value: config.sparks.emoji, label: "Text/Emoji" },
      emoji2: {
        value: config.sparks.emoji2,
        label: "Text/Emoji",
      },
      emoji3: {
        value: config.sparks.emoji3,
        label: "Text/Emoji",
      },
    }),
    { color: colours[6].value }
  );

  const [vibes, setVibes] = useControls(
    ControlName.Vibes,
    () => ({
      background: { value: config.vibes.background, label: "Background" },
      author: { value: "Rick", label: "Made By" },
      showAuthor: { value: true, label: "Author" },
    }),
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
      <div style={{ visibility: isHidden ? "hidden" : "visible" }}>
        <Leva titleBar={{ title: "make your own" }} collapsed={true} />
      </div>
      <div
        className="font-[family-name:var(--font-geist-sans)] w-screen h-screen flex flex-col items-center justify-between overflow-hidden py-24 px-10"
        style={{ background: vibes.background }}
      >
        <Wrapper>{null}</Wrapper>
        <div className="size-4">
          <Confetti active={isExploding} />
          <HoveringControls>
            <EyeButton isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
          </HoveringControls>
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
        <div className="flex flex-col gap-14 items-center justify-center">
          <div
            className="flex items-center justify-center"
            style={{ visibility: vibes.showAuthor ? "visible" : "hidden" }}
          >
            <Author author={vibes.author} />
          </div>
          <div
            className={`flex flex-col gap-8`}
            style={{ visibility: isHidden ? "hidden" : "visible" }}
          >
            <RainbowButton
              background={vibes.background}
              onClick={() => {
                randomise();
              }}
            />
            <Wrapper>
              <Branding />
            </Wrapper>
          </div>
        </div>
      </div>
    </>
  );
}

const Author = ({ author }: { author: string }) => {
  return (
    <div className="text-xs font-mono select-none">
      made by {author.toLowerCase()}
    </div>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-10">{children}</div>;
};

const HoveringControls = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-10 w-full absolute top-10 left-10 flex gap-4">
      {children}
    </div>
  );
};

const EyeButton = ({
  isOpen,
  toggleIsOpen,
}: {
  isOpen: boolean;
  toggleIsOpen: () => void;
}) => {
  return (
    <div className="h-10 flex flex-col gap-2">
      <button onClick={toggleIsOpen}>
        {isOpen ? <FaEye /> : <FaEyeSlash />}
      </button>
      {isOpen && (
        <span className="text-[8px] font-mono select-none">hide controls</span>
      )}
    </div>
  );
};

const RainbowButton = ({
  background,
  onClick,
}: {
  background: string;
  onClick: () => void;
}) => {
  const size = "h-10 w-full";

  return (
    <div className="relative">
      <button className={`rainbow-button ${size}`} onClick={onClick}></button>
      <div
        className={
          "absolute inset-1 rounded-sm pointer-events-none text-white z-30 text-xs font-mono flex items-center justify-center select-none"
        }
      >
        randomise
      </div>
      <div
        className={
          "absolute inset-1 rounded-sm pointer-events-none bg-black z-20 opacity-50"
        }
      ></div>
      <div
        className="absolute inset-1 rounded-sm pointer-events-none flex items-center justify-center"
        style={{
          background: background,
        }}
      ></div>
    </div>
  );
};

const Branding = () => {
  return (
    <div className="flex gap-4">
      <span className="text-sm font-mono select-none">
        react-fidget-spinner
      </span>
      <a href="https://www.npmjs.com/package/react-fidget-spinner">
        <Image
          src="https://img.shields.io/npm/v/react-fidget-spinner.svg"
          alt="npm version"
          width={80}
          height={20}
        />
      </a>
    </div>
  );
};
