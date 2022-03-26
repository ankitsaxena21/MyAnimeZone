import React, {  useContext, useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Home from "./screens/Home";
import Category from "./screens/Category";
import TopNavigation from "./TopNavigations";
import { AnimeContext } from "./API/Context";

export default function Tabs() {
  const layout = useWindowDimensions();

  const { index, setIndex } = useContext(AnimeContext);

  const [routes] = useState([
    { key: "first", title: "Categories" },
    { key: "second", title: "Home" },
  ]);

  const renderScene = SceneMap({
    first: Category,
    second: Home,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={() => <TopNavigation index={index} setIndex={setIndex} />}
    />
  );
}