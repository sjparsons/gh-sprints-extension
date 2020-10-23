function getCounts() {
    const counts = {};
    SIZES.forEach(size => {
        counts[size] = $(`.IssueLabel`).filter(function() { return $(this).text() === `size: ${size}`}).length;
    })
    return counts;
}

function addStoryPointCounter() {
    $(".js-check-all-container").prepend(`
        <div class="d-sm-flex flex-row f6 story-point-counter mb-3">
        </div>
    `);
}

function updateStoryPointCounter(counts) {
    if ($(".story-point-counter").length === 0) {
        addStoryPointCounter();
    }

    SIZES.forEach(size => {
        const sizeCounter = $(`.story-point-counter .size-counter [data-size-counter=${size}]`);
        if (sizeCounter.length !== 0) {
            sizeCounter.text(`${size}: ${counts[size]}`)
        } else {
            $(".story-point-counter").append(`
                <div class="size-counter">
                    <div class="Counter mr-1" data-size-counter="${size}">${size}: ${counts[size]}</div>
                </div>
            `)
        }
    });

    const totalCounter = $(`.story-point-counter .total-counter .Counter`);
    const totalDays = getTotalDays(counts);
    if (totalCounter.length !== 0) {
        totalCounter.text(`${totalDays} Days`);
    } else {
        $(".story-point-counter").append(`
            <div class="total-counter">
                <div class="Counter bg-green text-white">${totalDays} Days</div>
            </div>
        `)
    }

}

updateStoryPointCounter(getCounts())
setInterval(() => updateStoryPointCounter(getCounts()),1500)
