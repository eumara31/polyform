import Image from "next/image";
import WidthContainer from "./components/WidthContainer";
import Header from "./components/Header";
import NavigationBeam from "./components/NavigationBeam";
import ItemContainer from "./components/ItemContainer";
import Item from "./components/Item";

export default function Home() {
  return (
    <>
      <WidthContainer>
        <Header />
        <NavigationBeam/>
        <ItemContainer>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
          <Item></Item>
        </ItemContainer>
      </WidthContainer>
    </>
  );
}
