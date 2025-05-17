import React from 'react'
import ItemContainer from '@/app/components/ItemContainer';
import Item from '@/app/components/Item';
import CategorySidebar from './components/CategorySidebar';

type Props = {}

export default function page({}: Props) {
  return (
    <>
        <CategorySidebar>
        <ItemContainer>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
            <Item></Item>
        </ItemContainer>
        </CategorySidebar>
        </>
  )
}