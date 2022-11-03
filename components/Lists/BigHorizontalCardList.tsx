/* eslint-disable camelcase */
import bigHorizontalCardListNewsMap from "utils/bigHorizontalCardListNewsMap";

/**
 * Component that renders a list of Big Horizontal Cards.
 * @param {any} props to the component.
 * @return {TSX.Element}: The TSX code with a list of Big Horizontal Cards.
 */
export default function BigHorizontalCardList(props) {
  return bigHorizontalCardListNewsMap(props.postList);
}
