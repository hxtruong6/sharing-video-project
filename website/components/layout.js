import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.scss";
import "./layout.module.scss";

import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

import { Layout as LayoutAntd, Row, Col } from "antd";
import React from "react";
import AuthenticatedHeader from "./Layout/AuthenticatedHeader";
import UnauthenticatedHeader from "./Layout/UnauthenticatedHeader";
import { Divider } from "antd";

const { Header, Footer, Sider, Content } = LayoutAntd;

const name = "[Your Name]";
export const siteTitle = "So Scary Videos";

export default function Layout({ children, home, currUser }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Row className={styles.header__row}>
          <Col className="gutter-row" span={1}>
            <Image
              priority
              src="/images/rlogo.png"
              className={utilStyles.borderCircle}
              height={48}
              width={48}
              alt={name}
            />
          </Col>
          <Col className="gutter-row" span={8}>
            <div className={styles.header__title}>{siteTitle}</div>
          </Col>
          <Col className="gutter-row" span={15}>
            {currUser ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}
          </Col>
        </Row>
        <Divider />
        {/* {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )} */}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
