import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import './Graph.css'

function Graph({ data }) {
  const svgRef = useRef()

  useEffect(() => {
    if (!data || !svgRef.current) return

    // Dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 60 }
    const width = svgRef.current.parentElement.clientWidth - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Scales
    const xScale = d3.scaleLinear()
      .domain([0, data.maxQuantity])
      .range([0, width])

    const yScale = d3.scaleLinear()
      .domain([0, data.maxPrice])
      .range([height, 0])

    // Supply curve
    const supplyLine = d3.line()
      .x(d => xScale(d.quantity))
      .y(d => yScale(d.price))

    // Demand curve
    const demandLine = d3.line()
      .x(d => xScale(d.quantity))
      .y(d => yScale(d.price))

    // Draw supply curve
    svg.append('path')
      .datum(data.supply)
      .attr('class', 'supply-curve')
      .attr('d', supplyLine)
      .attr('stroke', '#e74c3c')
      .attr('stroke-width', 3)
      .attr('fill', 'none')

    // Draw demand curve
    svg.append('path')
      .datum(data.demand)
      .attr('class', 'demand-curve')
      .attr('d', demandLine)
      .attr('stroke', '#3498db')
      .attr('stroke-width', 3)
      .attr('fill', 'none')

    // Draw equilibrium point
    svg.append('circle')
      .attr('cx', xScale(data.equilibrium.quantity))
      .attr('cy', yScale(data.equilibrium.price))
      .attr('r', 8)
      .attr('class', 'equilibrium-point')
      .attr('fill', '#2ecc71')
      .attr('stroke', '#27ae60')
      .attr('stroke-width', 2)

    // Draw equilibrium lines
    svg.append('line')
      .attr('x1', 0)
      .attr('y1', yScale(data.equilibrium.price))
      .attr('x2', xScale(data.equilibrium.quantity))
      .attr('y2', yScale(data.equilibrium.price))
      .attr('class', 'equilibrium-line')
      .attr('stroke', '#95a5a6')
      .attr('stroke-dasharray', '5,5')
      .attr('stroke-width', 1)

    svg.append('line')
      .attr('x1', xScale(data.equilibrium.quantity))
      .attr('y1', yScale(data.equilibrium.price))
      .attr('x2', xScale(data.equilibrium.quantity))
      .attr('y2', height)
      .attr('class', 'equilibrium-line')
      .attr('stroke', '#95a5a6')
      .attr('stroke-dasharray', '5,5')
      .attr('stroke-width', 1)

    // X-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .attr('font-size', '14px')
      .text(data.xAxisLabel || 'Quantity (Unit)')

    // Y-axis
    svg.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .attr('font-size', '14px')
      .text(data.yAxisLabel || 'Price (Rp)')

    // Legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 150},${20})`)

    legend.append('line')
      .attr('x1', 0)
      .attr('x2', 20)
      .attr('stroke', '#3498db')
      .attr('stroke-width', 3)

    legend.append('text')
      .attr('x', 25)
      .attr('y', 5)
      .attr('text-anchor', 'start')
      .text('Permintaan (Demand)')

    legend.append('line')
      .attr('y1', 20)
      .attr('y2', 20)
      .attr('x1', 0)
      .attr('x2', 20)
      .attr('stroke', '#e74c3c')
      .attr('stroke-width', 3)

    legend.append('text')
      .attr('x', 25)
      .attr('y', 25)
      .attr('text-anchor', 'start')
      .text('Penawaran (Supply)')

  }, [data])

  return (
    <div className="graph-container">
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default Graph
