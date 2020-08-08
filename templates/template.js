const Template = function(title, cssFiles, headScripts, bodyGenerator) {

    this.cssFiles = ["/static/styles/site.css", ...cssFiles];
    this.headScripts = headScripts;
    this.bodyGenerator = bodyGenerator;
    this.title = title;

    this.genCSSLinks = function() {
        return this.cssFiles.map((file) => `<link rel="stylesheet" type="text/css" href="${file}">`).join("");
    };

    this.genHeadScripts = function() {
        return this.headScripts.map(file => `<script type="text/javascript" src="${file}"></script>`).join("");
    };

    this.render = function(bodyGeneratorParams) {
        return `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${this.genCSSLinks()}
        ${this.genHeadScripts()}
        <title>${this.title}</title>
    </head>
    
    <body>
        
        <div id="content">
            ${this.bodyGenerator(bodyGeneratorParams)}
        </div>

        <!-- Chrome bug fix -->
        <script> </script>
        
    </body>

</html>
        `;
    };

};

module.exports = Template;