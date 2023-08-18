import path from "path";
import fs from "fs/promises";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { cache } from "react";
import matter from "gray-matter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { GitHub, Icons } from "./icons";
import rehypeHighlight from "rehype-highlight"
import "./github-dark-dimmed.css"
import { githubUrl } from "./layout";


export default async function Index() {

    const markdown = await getMarkdown();
    return (
        <main>
            <a className="root github"
               href={ githubUrl }
               target="_blank"
               style={ {
                   zIndex: 1,
                   right: "calc(50% - 390px)",
                   width: "48px",
                   cursor: "pointer",
                   transition: "transform 0.2s ease-in-out",
               } }
            >
                <GitHub/>
            </a>


            <VerticalFade
                side="top"
                style={ {
                    height: 300,
                } }
            />
            <VerticalFade
                side="bottom"
                style={ {
                    height: 100,
                    zIndex: 3,
                } }
            />

            <HorizontalFade side="left"/>
            <HorizontalFade side="right"/>

            <Line
                direction="vertical"
                style={ {
                    position: "fixed",
                    height: "100vh",
                    top: 0,
                    left: "calc(50% - 420px)",
                } }
            />
            <Line
                direction="vertical"
                style={ {
                    position: "fixed",
                    top: 0,
                    height: "100vh",
                    right: "calc(50% - 420px)",
                } }
            />

            <div className="root">
                <h1>
                    <Line
                        variant="defined"
                        direction="horizontal"
                        style={ {
                            width: "500vw",
                            top: "var(--offset)",
                        } }
                    />
                    <Line
                        variant="subtle"
                        direction="horizontal"
                        style={ {
                            top: "calc(var(--lh) - var(--offset) * 2 + 1px)",
                        } }
                    />
                    <Line
                        variant="defined"
                        direction="horizontal"
                        style={ {
                            top: "calc(var(--lh) + var(--offset))",
                        } }
                    />
                    <Line
                        variant="subtle"
                        direction="horizontal"
                        style={ {
                            top: "calc(var(--lh) * 2 - var(--offset) * 2 + 1px)",
                        } }
                    />
                    <Line
                        variant="defined"
                        direction="horizontal"
                        style={ {
                            top: "calc(var(--lh) * 2 + var(--offset) - 0.4px)",
                        } }
                    />
                    <Line
                        variant="subtle"
                        direction="horizontal"
                        style={ {
                            top: "calc(var(--lh) * 3 - var(--offset) * 2 + 1px)",
                        } }
                    />
                    Lark-Base <br/>
                    Extension <br/>
                    Starter
                </h1>

            </div>


            <div className="content">
                <MDXRemote
                    source={ markdown.content }
                    options={ {
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeHighlight],
                        },
                    } }
                    components={ mdxComponents }
                />
            </div>
        </main>
    );
}

///////////////////////////////////////////////////////////////////

function VerticalFade({ side, ...props }) {
    return (
        <div aria-hidden className="verticalFade" data-side={ side } { ...props } />
    );
}

function HorizontalFade({ side, ...props }) {
    return (
        <div aria-hidden className="horizontalFade" data-side={ side } { ...props } />
    );
}

function Line({ variant, direction, ...props }) {
    return (
        <div
            aria-hidden
            className="line"
            data-variant={ variant }
            data-direction={ direction }
            { ...props }
        />
    );
}

///////////////////////////////////////////////////////////////////

const getMarkdown = cache(async () => {
    const filePath = path.join(process.cwd(), "README.md");
    const file = await fs.readFile(filePath, "utf8");
    return matter(file);
});

const mdxComponents = {
    h2: (props) => {
        return (
            <h2 { ...props }>
                { Icons[props.id] }
                { props.children }
            </h2>
        );
    },
    a: (props) => {
        const p = {
            ...(props.href.startsWith("http") && {
                target: "_blank",
                rel: "noopener noreferrer",
            }),
        };
        return <a { ...props } { ...p } />;
    },
    img: (props) => {
        if (props.alt === "join") {
            return <img { ...props } style={ { width: "500px", borderRadius: '12px', paddingTop: '10px' } }/>
        }
        return <img { ...props }  />
    }
};

///////////////////////////////////////////////////////////////////


