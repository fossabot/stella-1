export default `
  type Tag {
    id: String
    title: String
  }
  type ContentAbout {
    updateTimes: [Date!]!
    tags: [Tag!]!
    category: String
    readTime: Int
  }
  type Passage implements Node {
    identifier: String!
    title: String!
    abbr: String!
    about: ContentAbout!
    orderDate: Date!
  }
  type PassageDetail implements Node {
    item: Passage!
    content: String!
    topImage: String
    topImageAlt: String
    circleImage: String
  }
  type PostTag implements Node {
    id: String!
    title: String!
  }
  type CategoryInternal {
    content: String!
  }
  type PostCategory implements Node {
    internal: CategoryInternal!
  }
  type SnippetContentAbbr {
    identifier: String!
    title: String!
    abbr: String
    about: ContentAbout!
    codeRaw: String
  }
  type Snippet implements Node {
    item: SnippetContentAbbr!
    content: String!
    topImage: String
    topImageAlt: String
    circleImage: String
    orderDate: Date!
  }
   type SnippetTag implements Node {
    id: String!
    title: String!
  }
  type SnippetCategory implements Node {
    internal: CategoryInternal!
  }
  type About implements Node {
    item: Passage!
    content: String!
    topImage: String
    topImageAlt: String
    circleImage: String
  }
  
  enum CreativeCommons {
    by
    byNc
    byNcNd
    byNcSa
    byNd
    bySa
  }
  type Copyright {
    author: String
    creativeCommons: CreativeCommons
  }
  type SiteMetadata {
    config: Config!
    routeConfigurations: RouteConfiguration!
    pageDescription: PageDescription
    medias: [SocialMedia!]!
    copyright: Copyright
    bannerText: String
  }
  type Config {
    siteName: String!
    homeLargeTitle: String
    disqus: DisqusConfig
    lang: String!
    host: String!
  }
  type DisqusConfig {
    shortName: String!
    developmentShortName: String!
  }
  type RouteConfiguration {
    about: RouteConfigurationItem!
    passages: RouteConfigurationItem!
    snippets: RouteConfigurationItem!
  }
  type RouteConfigurationItem {
    title: String!
  }
  type PageDescription {
    home: PageDescriptionItem
    passages: PageDescriptionItem
    snippets: PageDescriptionItem
    about: PageDescriptionItem
  }
  type PageDescriptionItem {
    title: String!
    keywords: [String!]!
    description: String
    largeImage: String
    largeImageAlt: String
  }
  type SocialMedia {
    identifier: String!
    iconName: String!
    title: String!
    link: String
    imageName: String
  }
`;
