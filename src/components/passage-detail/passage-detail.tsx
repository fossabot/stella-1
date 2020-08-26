import React, { HTMLAttributes } from "react";
import PassageTitle from "../passage-title/passage-title";
import PassageAbout from "../passage-about/passage-about";
import { DiscussionEmbed } from "disqus-react";
import "./passage-detail.scss";
import { BaseContentDetail } from "../../models/base-content";
import { DiscusConfig } from "../../models/config";
import marked from "marked";

export enum PassageDetailViewMode {
  Full,
  Partial
}

function PassageDetail(
  {passage, disqusConfig, mode = PassageDetailViewMode.Full, className}:
    {passage: BaseContentDetail, disqusConfig?: DiscusConfig, mode?: PassageDetailViewMode} & HTMLAttributes<any>
) {
  return (
    <div className={`passage-container ${className ? className : ""}`}>
      {
        (!!passage.topImage && mode === PassageDetailViewMode.Full) ?
          <img src={passage.topImage} className="passage-top-image" /> :
          <></>
      }
      <div className="passage-title-container">
        {
          (!!passage.circleImage && mode === PassageDetailViewMode.Full) ?
            <img src={passage.circleImage} className="passage-circle-image" /> :
            <></>
        }
        <div className="passage-title">
          <PassageTitle title={passage.item.title}/>
          {
            PassageDetailViewMode.Full !== mode ?
              <></> :
              <PassageAbout
                {...passage.item.about}
              />
          }
        </div>
      </div>
      <div
        className={`
          passage-content-container 
          ${mode === PassageDetailViewMode.Partial ? "partial" : ""}
        `}
        dangerouslySetInnerHTML={{__html: marked(passage.content)}}
        style={{
          marginTop: PassageDetailViewMode.Full !== mode ? 22 : undefined,
        }}
      />
      { PassageDetailViewMode.Full === mode ?
        <></> :
        <PassageAbout
          {...passage.item.about}
        />
      }
      {
        (!!disqusConfig && mode === PassageDetailViewMode.Full) ?
          <div className="passage-comment-container">
            <DiscussionEmbed
              shortname={disqusConfig.shortName}
              config={{
                url: "https://localhost/blablabla",
                identifier: passage.item.identifier,
                title: passage.item.title,
              }}
            />
          </div> :
          <></>
      }
    </div>
  );
}

export default PassageDetail;