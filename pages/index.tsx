import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import styles from '../styles/Home.module.css';
import { CONTAINER } from '../utils';

interface SubReddit {
    data: {
        children: {
            data: {
                title: string;
            };
        }[];
    };
}

const Home: NextPage = () => {
    const [reddit, setReddit] = useState<SubReddit>();

    useEffect(() => {
        const getSubReddit = async () => {
            try {
                // const res = await fetch('https://reddit.com/r/all.json');
                const res = await fetch('/api/reddit');

                setReddit(await res.json());
            } catch (e) {
                console.log(e);
            }
        };

        getSubReddit();
    }, []);

    return (
        <Layout
            title="Covalence | Home"
            description="Premium, online, software education">
            <section className={CONTAINER}>
                <div className="text-center py-10">
                    <h1 className="text-3xl font-semibold">Hello World!</h1>
                    <h2 className="text-xl text-gray-500 font-medium">
                        {' '}
                        - Covalence
                    </h2>
                </div>
            </section>
            <section>
                {reddit?.data?.children?.map((c, i) => {
                    return (
                        <h3 key={i} className="subreddit">{c.data?.title}</h3>
                    );
                })}
            </section>
        </Layout>
    );
};

export default Home;
