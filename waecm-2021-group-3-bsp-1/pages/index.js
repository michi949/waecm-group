import Head from "next/head";
import Banner from "../components/Banner";
import LoginSection from "../components/LoginSection";
import styled from "styled-components";

export default function Home() {
  return (
    <div>
      <Banner />
      <LoginSection />
    </div>
  );
}
