import React from 'react'
import { useEffect } from 'react';

export default function About() {

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, []);
  return (
    <div>
      <h1>about</h1>
    </div>
  )
}
