import App, { Container } from 'next/app'
import React from 'react'

export default class MyApp extends App {
  componentDidCatch(error, info) {
    console.log(error)
    console.log(info)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}
