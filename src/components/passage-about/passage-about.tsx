import React from "react";
import "./passage-about.scss";
import moment from "moment";
import { About, Tag } from "../../models/base-content";

function PassageAbout(props: {
  about: About;
  onCategoryClick: (about: About, category?: string) => void;
  onTagClick: (about: About, tag: Tag) => void;
}) {
  const { about } = props;
  const lastUpdateTime = about.updateTimes[about.updateTimes.length - 1];
  const timeStr = moment(lastUpdateTime).format("YYYY/M/D");
  const readTimeStr = moment.duration(about.readTime).minutes() + "min";

  return (
    <span className="passage-about">
      <span className="passage-about-information">
        <span className="passage-information">
          <span className="passage-information-icon icon-calendar" />
          <span className="passage-information-value">{timeStr}</span>
        </span>
        {!!about.readTime ? (
          <span className="passage-information">
            <span className="passage-information-icon icon-timer" />
            <span className="passage-information-value">{readTimeStr}</span>
          </span>
        ) : (
          <></>
        )}
      </span>
      <span className="passage-about-tags">
        {[
          <span
            className="passage-tag"
            key={about.category}
            onClick={() => props.onCategoryClick(about, about.category)}
          >
            {about.category}
          </span>,
          ...about.tags.map((item) => (
            <span
              className="passage-tag"
              key={item.id}
              onClick={() => props.onTagClick(about, item)}
            >
              #{item.title}
            </span>
          )),
        ]}
      </span>
    </span>
  );
}

export default PassageAbout;
