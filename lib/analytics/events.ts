export const AnalyticsEvents = {
  MOBILE_MENU_CLICKED: "mobile_menu_clicked",
  MOBILE_MENU_ITEM_CLICKED: "mobile_menu_item_clicked",
  HEADER_LOGO_CLICKED: "header_logo_clicked",
  HEADER_NAV_CLICKED: "header_nav_clicked",
  PRODUCT_CARD_CLICKED: "product_card_clicked",
  NEWS_CARD_CLICKED: "news_card_clicked",
  CATEGORY_CARD_CLICKED: "category_card_clicked",
  MORE_NEWS_CLICKED: "more_news_clicked",
  SEARCH_PERFORMED: "search_performed",
  SEARCH_RESULT_CLICKED: "search_result_clicked",
  OFFER_CLICKED: "offer_clicked",
  REVIEW_CLICKED: "review_clicked",
  FILTER_APPLIED: "filter_applied",
  PAGINATION_CLICKED: "pagination_clicked",
  BREADCRUMB_CLICKED: "breadcrumb_clicked",
  COOKIE_CONSENT_CLICKED: "cookie_consent_clicked",
  PRIVACY_POLICY_CLICKED: "privacy_policy_clicked",
  NOT_FOUND_HOME_CLICKED: "not_found_home_clicked",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

export const AnalyticsProps = {
  ACTION: "action",
  CATEGORY: "category",
  CHOICE: "choice",
  FILTER_TYPE: "filter_type",
  LABEL: "label",
  PAGE: "page",
  PRICE: "price",
  QUERY: "query",
  RATE: "rate",
  RATING: "rating",
  SECTION: "section",
  SLUG: "slug",
  SOURCE: "source",
  STORE: "store",
  TITLE: "title",
  URL: "url",
  VALUE: "value",
} as const;

export type AnalyticsEventMap = {
  [AnalyticsEvents.MOBILE_MENU_CLICKED]: {
    action: "open" | "close";
  };
  [AnalyticsEvents.MOBILE_MENU_ITEM_CLICKED]: {
    section: string;
    label: string;
    url: string;
  };
  [AnalyticsEvents.HEADER_LOGO_CLICKED]: {
    url: string;
  };
  [AnalyticsEvents.HEADER_NAV_CLICKED]: {
    label: string;
    url: string;
  };
  [AnalyticsEvents.PRODUCT_CARD_CLICKED]: {
    title: string;
    url: string;
    price: number;
    rating: number;
  };
  [AnalyticsEvents.NEWS_CARD_CLICKED]: {
    title: string;
    url: string;
    category?: string;
  };
  [AnalyticsEvents.CATEGORY_CARD_CLICKED]: {
    title: string;
    url: string;
  };
  [AnalyticsEvents.MORE_NEWS_CLICKED]: {
    url: string;
  };
  [AnalyticsEvents.SEARCH_PERFORMED]: {
    query: string;
    source: "home" | "header";
  };
  [AnalyticsEvents.SEARCH_RESULT_CLICKED]: {
    title: string;
    url: string;
    slug: string;
  };
  [AnalyticsEvents.OFFER_CLICKED]: {
    store: string;
    price: number;
    url: string;
  };
  [AnalyticsEvents.REVIEW_CLICKED]: {
    store: string;
    rate: number;
    url: string;
  };
  [AnalyticsEvents.FILTER_APPLIED]: {
    filter_type: "subcategory" | "brand";
    value: string;
  };
  [AnalyticsEvents.PAGINATION_CLICKED]: {
    page: number;
    url: string;
  };
  [AnalyticsEvents.BREADCRUMB_CLICKED]: {
    label: string;
    url: string;
  };
  [AnalyticsEvents.COOKIE_CONSENT_CLICKED]: {
    choice: "accepted" | "declined";
  };
  [AnalyticsEvents.PRIVACY_POLICY_CLICKED]: {
    source: "banner" | "footer";
    url: string;
  };
  [AnalyticsEvents.NOT_FOUND_HOME_CLICKED]: {
    url: string;
  };
};
