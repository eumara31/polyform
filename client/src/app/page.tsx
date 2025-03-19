import Image from "next/image";
import WidthContainer from "./components/WidthContainer";
import Header from "./components/Header";
import NavigationBeam from "./components/NavigationBeam";
import ItemContainer from "./components/ItemContainer";
import Item from "./components/Item";
import ItemCarousel from "./components/ItemCarousel";

export default function Home() {
  return (
    <>
      <WidthContainer>
        <Header />
        <NavigationBeam name="Лучшие модели" logo="trophy.svg"/>
        <ItemCarousel>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          </ItemCarousel>
          <NavigationBeam name="Топ продаж" logo="bookmark_star.svg"/>
        <ItemContainer>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
        </ItemContainer>
      </WidthContainer>
    </>
  );
}
