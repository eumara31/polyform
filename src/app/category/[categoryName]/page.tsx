import React from 'react'
import Image from "next/image";
import WidthContainer from '@/app/components/WidthContainer';
import Header from '@/app/components/Header';
import ItemContainer from '@/app/components/ItemContainer';
import Item from '@/app/components/Item';
import CategorySidebar from './components/CategorySidebar';
import PriceSlider from "./components/PriceSlider";

type Props = {}

export default function page({}: Props) {
  return (
    <WidthContainer>
        <Header></Header>
        <CategorySidebar>
        <ItemContainer>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
        </ItemContainer>
        </CategorySidebar>
    </WidthContainer>
  )
}