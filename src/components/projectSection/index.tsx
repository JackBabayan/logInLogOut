"use client";

import { useRef, useEffect, useMemo } from 'react';
import Link from "next/link";
import ProjectItems from "@/components/projectItems";
import { Text, Center, Box, SimpleGrid, Button } from "@chakra-ui/react";
import { ArrowLeftTopIcon } from "@/styles/icon";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './style.module.scss'
// Инициализация ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection({ projects, loading, error }) {
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<(HTMLDivElement | null)>(null);

    // useEffect(() => {

    //     if (projectRefs.current.length > 0) {
    //         projectRefs.current.forEach((ref, index) => {
    //             if (ref) {
    //                 console.log(`Animating project ${index}`);
    //                 gsap.to(ref, {
    //                     x: index % 2 === 0 ? -100 : 100,
    //                     opacity: 0,
    //                     duration: 1,
    //                     scrollTrigger: {
    //                         trigger: sectionRef.current,
    //                         start: "top 80%",
    //                         end: "bottom 20%",
    //                         toggleActions: "play none none reverse",
    //                     },
    //                 });
    //             }
    //         });
    //     }

    //     return () => {
    //         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    //     };
    // }, [projects]);

    const projests = useMemo(() => {
        return projects?.map((item, index) => (
            <Box
                className={styles.wrapperItem}
                key={item.id}
                ref={(el) => {
                    projectRefs.current[index] = el;
                }}
                maxW={{ base: "100%", md: "66%" }}
                justifySelf={index % 2 === 0 ? "start" : "end"}
            >
                <ProjectItems project={item} />
            </Box>
        ));
    }, [projects]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box as="section" ref={sectionRef} className={styles.wrapper}>
            <Center className={styles.top}>
                <Box maxW="600px" textAlign="center">
                    <h2>Projects</h2>
                    <Box>
                        <Text>
                            My expertise includes React, TypeScript, Redux Toolkit, REST APIs, Next.js, Webpack,
                            Vite, Babel, and other technologies such as HTML, CSS, SCSS, LESS, Ant Design, GSAP, Chakra UI, MUI, and Tampermonkey.
                            I focus on writing clean, scalable, and maintainable code while ensuring optimal performance and usability. I also have experience
                            integrating REST APIs and utilizing various tools to streamline the development process.
                        </Text>
                    </Box>
                </Box>
            </Center>
            <SimpleGrid columns={{ base: 1 }} gap={"100"} className={styles.content}>
                {projests}
            </SimpleGrid>
            <Center>
                <Link href="/projects">
                    <Button rightIcon={<ArrowLeftTopIcon />} variant="outline">
                        All Projects
                    </Button>
                </Link>
            </Center>
        </Box>
    );
}