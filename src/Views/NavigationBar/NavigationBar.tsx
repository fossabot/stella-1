import React, { useEffect, useState } from 'react'
import './NavigationBar.scss'
import NavigationLink from "./NavigationLink";
import MediaInformationView from "../MediaInformationView/MediaInformationView";
import { useHistory, useLocation } from "react-router";
import {
  categoryBaseLink,
  getRouteItemOfPath,
  notFoundLink,
  passageLink,
  rootLink,
  routeLinks,
  tagBaseLink
} from "../../Routes";
import Popover from "antd/lib/popover";
import List from "antd/lib/list";
import { PassageTag } from "../../Models/PassageTag";
import { useSelector } from "react-redux";
import { tagsSelector } from "../../Services/SelectTags";
import { categoriesSelector } from "../../Services/SelectCategories";
import { useFilter } from "../../Services/UseFilter";

function NavigationBar({title}: {title: string}) {
  const history = useHistory()
  const location = useLocation()
  const goToHome = () => {
    history.push(rootLink)
  }
  const goToCategory = (category: string) => {
    history.push(categoryBaseLink + category);
  }
  const goToTag = (tag: PassageTag) => {
    history.push(tagBaseLink + tag.title);
  }

  const isPassage = location.pathname.startsWith(passageLink);

  const isSpecial = getRouteItemOfPath(location.pathname)?.special ?? false
  const showSpecial = location.pathname === rootLink || location.pathname === notFoundLink || isSpecial
  const isHome = location.pathname === rootLink

  const [showTagPopover, setShowTagPopover] = useState(false);
  const [showCatePopover, setShowCatePopover] = useState(false);

  // @ts-ignore
  const tags: PassageTag[] = useSelector(tagsSelector);
  // @ts-ignore
  const categories: string[] = useSelector(categoriesSelector);

  const [currentTagFilter, currentCategoryFilter] = useFilter();

  return (
    <div id="navigation-bar" className={!isHome ? "navigation-bar-shrink" : ""}>
      <div id="navigation-bar-content">
        <h1 id="blog-name-label" onClick={goToHome}>{title}</h1>
        <ul id="links-list">
          {
            [
              ...routeLinks.filter((item) => {
                return showSpecial ? true : !item.special
              }).map((item, index) => (
                <NavigationLink
                  title={item.title}
                  to={item.link}
                  special={item.special}
                  selected={location.pathname.startsWith(item.link)}
                  key={index}
                />
              )),
              <Popover
                onVisibleChange={(value) => {
                  setShowTagPopover(value);
                }}
                placement={"bottom"}
                visible={showTagPopover}
                content={
                  <div className="navigation-link-popover">
                    <List
                      itemLayout="horizontal"
                      dataSource={tags}
                      renderItem={(item: PassageTag) => (
                        <List.Item
                          onClick={() => {
                            goToTag(item);
                          }}
                          className={
                            `navigation-link-popover-item 
                                ${item.title === currentTagFilter ?
                              "navigation-link-popover-item-selected" : ""}`
                          }
                        >
                          <List.Item.Meta
                            title={
                              <span className="navigation-link-popover-selected">{item.title}</span>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                }
              >
                <NavigationLink
                  title={"tag"}
                  selected={location.pathname.startsWith(tagBaseLink)}
                  onCLick={() => {
                    setShowTagPopover(!showTagPopover);
                    if (showCatePopover) {
                      setShowCatePopover(false);
                    }
                  }}
                />
              </Popover>,
              <Popover
                onVisibleChange={(value) => {
                  setShowCatePopover(value);
                }}
                placement={"bottom"}
                visible={showCatePopover}
                content={
                  <div className="navigation-link-popover">
                    <List
                      itemLayout="horizontal"
                      dataSource={categories}
                      renderItem={(item: string) => (
                        <List.Item
                          onClick={() => {
                            goToCategory(item);
                          }}
                          className={
                            `navigation-link-popover-item 
                                ${item === currentCategoryFilter ?
                              "navigation-link-popover-item-selected" : ""}`
                          }
                        >
                          <List.Item.Meta
                            title={
                              <span className="navigation-link-popover-selected">{item}</span>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                }
              >
                <NavigationLink
                  title={"category"}
                  selected={location.pathname.startsWith(categoryBaseLink)}
                  onCLick={() => {
                    setShowCatePopover(!showCatePopover);
                    if (showTagPopover) {
                      setShowTagPopover(false);
                    }
                  }}
                />
              </Popover>
            ]
          }
        </ul>
        <ul id="links-list-passage-list" className={!isPassage ? "links-list-passage-list-hide" : ""}>

        </ul>
        <MediaInformationView className="navigation-bar-media-info"/>
      </div>
    </div>
  );
}

export default NavigationBar