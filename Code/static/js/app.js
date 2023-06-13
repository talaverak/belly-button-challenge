// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

function init() {
    let dropDownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {
        let names = data.names;
        names.forEach((id) => {
            console.log(id);
            dropDownMenu.append("option")
            .text(id)
            .property("value", id);
        });

        //first sample from list
        let sample_one = names[0];
        console.log(sample_one);
        //plot points
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
    });
};
// Function for matadata
function buildMetadata(sample) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let value = metadata.filter(result => result.id == sample);
        console.log(value)

//clear metadat
        let valueData = value[0]; 
        d3.select("#sample-metadata").html("");


        Object.entries(valueData).forEach(([key,value]) => {
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};


//Bar chart function
function buildBarChart(sample) {
    d3.json(url).then((data) => {
        let sampleInfo = data.samples;

        let value = sampleInfo.filter(result => result.id ==sample); 

        let valueData = value[0];

        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;
        let otu_ids = valueData.otu_ids;

        console.log(sample_values, otu_ids, otu_labels);

        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).slice().reverse();
        let xticks = sample_values.slice(0,10).slice().reverse();
        let labels = otu_labels.slice(0,10).slice().reverse();

        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar", 
            orientation: "h"
        };
        let traceData = [trace]
//set up layout
        let layout = {
            title: "Top 10 OTUs Present",
            };
        Plotly.newPlot("bar", traceData, layout)
    });
};
//bubble chart function
function buildBubbleChart(sample) {
    d3.json(url).then((data) => {
        let sampleInfo = data.samples;

        let value = sampleInfo.filter(result => result.id == sample);

        let valueData = value[0];

        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;
        let otu_ids = valueData.otu_ids;

        console.log(otu_ids,otu_labels,sample_values);

        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };
//set up layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        Plotly.newPlot("bubble", [trace1], layout)
    });
};

function optionChanged(value) {
    console.log(value); 

    buildMetadata(value);
    buildBarChart(value); 
    buildBubbleChart(value); 
};

init(); 

       

