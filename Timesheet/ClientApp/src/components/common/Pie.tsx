import * as d3 from "d3";
import * as React from "react";

interface Datum {
    label : string;
    value : number;
}

interface Props {
    radiusInPixels: number;
    lineWidthInPixels: number;
    data : Datum[];
    colorScheme : ReadonlyArray<ReadonlyArray<string>>;
}

export function Pie(props: Props): JSX.Element {

    const ref = React.useRef(null);

    const arcGen = d3.arc<d3.PieArcDatum<Datum>>()
        .innerRadius(props.radiusInPixels * 2 / 3)
        .outerRadius(props.radiusInPixels - props.lineWidthInPixels)
        .cornerRadius(2);

    const arcs = d3.pie<Datum>().padAngle(0.02).value(d => d.value)(props.data);
    const colours = d3.scaleOrdinal(props.colorScheme[props.data.length]);

    React.useEffect(() => {
        d3.select(ref.current)
            .select("g")
            .selectAll('whatever')
            .data(arcs)
            .enter()
            .append('path')
            .attr('d', arcGen)
            .attr('fill', a => colours(a.data.label))
            .attr("stroke", "black")
            .style("stroke-width", `${props.lineWidthInPixels}px`)
            .style("opacity", 0.7);
    }, [arcGen, arcs, colours, props]);

    return (
        <svg
            className="container"
            ref={ref}
            width={props.radiusInPixels * 2}
            height={props.radiusInPixels * 2}
        >
            <g transform={`translate(${props.radiusInPixels},${props.radiusInPixels})`}></g>
        </svg>
    );
}