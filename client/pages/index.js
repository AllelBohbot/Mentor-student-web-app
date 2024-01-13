import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'

function Home() {
  return (
    <>
      <Head>
        <title>Collaborate coding | Home</title>
      </Head>
      <div>
        <h1 className={styles.title}>Choose code block</h1>
        <p className={styles.btn}><Link href="/page2">Hello World</Link></p>
        <p className={styles.btn}><Link href="/page3">Add</Link></p>
        <p className={styles.btn}><Link href="/page4">Is even</Link></p>
        <p className={styles.btn}><Link href="/page5">Fibonacci 5</Link></p>
    </div>
  </>
  )
}

export default Home