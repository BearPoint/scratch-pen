export const htmlTemplate = ({html='', css="", javascript=''}) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <style>
                *{
                    margin: 0;
                    padding: 0;
                }
                ${css}
                </style>
            </head>
            <body>
                ${html}
                <script type="module">
                ${javascript}
                </script>
            </body>
        </html>
    `
}