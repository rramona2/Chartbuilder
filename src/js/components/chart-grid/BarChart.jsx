var React = require("react");
var PropTypes = React.PropTypes;
var map = require("lodash/map");
var assign = require("lodash/assign");
var seriesUtils         = require("../../util/series-utils.js");

var VerticalAxis        = require("../shared/VerticalAxis.jsx");
var BarLabels           = require("../shared/BarLabels.jsx");
var BlockerRects        = require("../shared/BlockerRects.jsx");
var SeriesLabel         = require("../shared/SeriesLabel.jsx");

var BarChart = React.createClass({

	propTypes: {
		xScale: PropTypes.func,
		yScale: PropTypes.func,
		dimensions: PropTypes.object,
		chartType: PropTypes.string,
		metadata: PropTypes.object,
		translate: PropTypes.array
	},

	getDefaultProps: function() {
		return {
			translate: [0, 0],
			tickTextHeight: 0
		}
	},

	render: function() {
		var props = this.props;
		//var children = React.Children.toArray(props.children);
		//var childrenWithProps = map(children, function(child) {
			//var childProps = assign({}, props, child.props);
			//return React.cloneElement(child, childProps);
		//});

		var barProps = {
			data: props.data,
			colorIndex: props.colorIndex
		};

		var barGroupProps = assign({}, props, {
			key: "bar",
			bars: [ barProps ],
			orientation: "horizontal"
		})

		var bars = seriesUtils.createSeries("column", barGroupProps);

		return (
			<g
				className={"chart chart-" + props.chartType}
				transform={"translate(" + props.translate + ")"}
			>
				<SeriesLabel
					key="label"
					xVal={0}
					text={props.label}
					colorIndex={props.colorIndex}
					{...this.props}
				/>
				<g
					className="bar-area"
					transform={"translate(0," + props.labelOffset + ")"}
				>
					{bars}
				</g>
			</g>
		);
	}

});

module.exports = BarChart;
