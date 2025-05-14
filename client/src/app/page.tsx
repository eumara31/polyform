import NavigationBeam from "./components/NavigationBeam";
import ItemContainer from "./components/ItemContainer";
import Item from "./components/Item";
import BestModelSwiper from "./components/ItemSwiper";

export default function Home() {
  return (
    <>
        <NavigationBeam name="Лучшие модели" logo="trophy.svg"/>
        <BestModelSwiper swiperDirection="horizontal" spaceBetweenItems={30} itemsPerView={3}>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          </BestModelSwiper>
          <NavigationBeam name="Топ продаж" logo="bookmark_star.svg"/>
        <ItemContainer>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
          <Item modelName={""}></Item>
        </ItemContainer>
    </>
  );
}
