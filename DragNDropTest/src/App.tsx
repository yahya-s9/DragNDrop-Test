import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import { SortableItem } from './sortableItem';

import {
  DndContext, // context we need to have DND enabled
  closestCenter // helps us detect when two things over each other
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy // helps w/ sorting functionality
} from "@dnd-kit/sortable";

import { useState } from 'react';


function App() {

  // the data that can change over time (the state) is an array of strings
  // can also make this an array of objects if you really wanted 
  const [languages, setLanguages] = useState(['JS', 'Python', 'TS'])

  return (
    <>
      {/* everything that uses DND functionality has to be in a DND context */}
      {/* can define how we want DND to work inside the openign DNDContext tag */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Container className="p-3" style={{"width": "50%"}}>
          <h3>The Best Programming Languages</h3>

          {/* everything u want to be able to sort in here
          sortableContext needs the items and the strategy */}
          <SortableContext
          items={languages}
          strategy={verticalListSortingStrategy}
          >
            {/* wihtin this sortable context we need components that use the useSortable hook,
            which allows us to create react components that are able to be interacted by sortable context */}

            {/* can now map over our state in order to create a bunch of sortableItem components */}
            {/* take the current language that we're at, pass it into the sortanle item  */}
            {/* need two properties: a key (react best practice), and then every sortable item has a identificationprop.*/}
            {languages.map(language => <SortableItem key={language} identification={language}/>)}

          </SortableContext>
        </Container>
      </DndContext>
    </>
  );

  function handleDragEnd(event: any) {
    // console.log("Drag end")
    const {active, over} = event;
    // console.log("Active: " + active.id);
    // console.log("Over: "+ over.id);

    if(active.id != over.id) {
      setLanguages((items) => {
         const activeIndex = items.indexOf(active.id);
         const overIndex = items.indexOf(over.id);
         console.log(arrayMove(items, activeIndex, overIndex));
         return arrayMove(items, activeIndex, overIndex);
      });
    }
  }

}

export default App
