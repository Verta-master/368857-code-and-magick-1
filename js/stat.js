'use strict';

window.renderStatistics = function (ctx, names, times) {
  var histogramData = {
    histogramHeight: 150,
    barWidth: 40,
    indent: 50,
    initialX: 120,
    initialY: 100,
    lineHeight: 15
  };
  var cloudData = {
    startX: 100,
    startY: 10,
    width: 420,
    height: 270,
    arcSize: 10,
    shadowShift: 10
  };
  var thirdX = Math.round(cloudData.startX + cloudData.width / 3);
  var thirdY = Math.round(cloudData.startY + cloudData.height / 3);
  var halfX = Math.round(cloudData.startX + cloudData.width / 2);
  var halfY = Math.round(cloudData.startY + cloudData.height / 2);

  function drawCloud(shift) {
    ctx.beginPath();
    ctx.moveTo(cloudData.startX + shift, cloudData.startY + shift);
    ctx.lineTo(thirdX + shift, cloudData.startY + shift);
    ctx.bezierCurveTo(
        halfX + shift, cloudData.startY - cloudData.arcSize + shift,
        halfX + shift, cloudData.startY - cloudData.arcSize + shift,
        thirdX * 2 - cloudData.startX + shift, cloudData.startY + shift
    );
    ctx.lineTo(cloudData.startX + cloudData.width + shift, cloudData.startY + shift);
    ctx.lineTo(cloudData.startX + cloudData.width + shift, thirdY + shift);
    ctx.bezierCurveTo(
        cloudData.startX + cloudData.width + cloudData.arcSize + shift, halfY + shift,
        cloudData.startX + cloudData.width + cloudData.arcSize + shift, halfY + shift,
        cloudData.startX + cloudData.width + shift, thirdY * 2 - cloudData.startY + shift
    );
    ctx.lineTo(cloudData.startX + cloudData.width + shift, cloudData.startY + cloudData.height + shift);
    ctx.lineTo(thirdX * 2 - cloudData.startX + shift, cloudData.startY + cloudData.height + shift);
    ctx.bezierCurveTo(
        halfX + shift, cloudData.startY + cloudData.height + cloudData.arcSize + shift,
        halfX + shift, cloudData.startY + cloudData.height + cloudData.arcSize + shift,
        thirdX + shift, cloudData.startY + cloudData.height + shift
    );
    ctx.lineTo(cloudData.startX + shift, cloudData.startY + cloudData.height + shift);
    ctx.lineTo(cloudData.startX + shift, thirdY * 2 - cloudData.startY + shift);
    ctx.bezierCurveTo(
        cloudData.startX - cloudData.arcSize + shift, halfY + shift,
        cloudData.startX - cloudData.arcSize + shift, halfY + shift,
        cloudData.startX + shift, thirdY + shift
    );
    ctx.lineTo(cloudData.startX + shift, cloudData.startY + shift);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }

  // cloud's shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  drawCloud(cloudData.shadowShift);

  // white cloud
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  drawCloud(0);

  // Message on the cloud
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', 310, 40);
  ctx.fillText('Список результатов:', 310, 60);
  ctx.textAlign = 'left';

  // Useful functions
  function getMaxFromArray(customArray) {
    return Math.max.apply(null, customArray);
  }

  function getColorPlayer(player) {
    return player === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + Math.random() + ')';
  }

  // Histogram
  var step = histogramData.histogramHeight / getMaxFromArray(times);

  function drawBar(item, i) {
    ctx.fillStyle = getColorPlayer(names[i]);
    ctx.fillRect(
        histogramData.initialX + (histogramData.barWidth + histogramData.indent) * i,
        histogramData.histogramHeight - item * step + histogramData.initialY,
        histogramData.barWidth,
        item * step
    );
  }

  function typeNames(item, i) {
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillText(
        item,
        histogramData.initialX + (histogramData.barWidth + histogramData.indent) * i,
        histogramData.histogramHeight + histogramData.lineHeight + histogramData.initialY
    );
  }

  function typeTime(item, i) {
    ctx.fillText(
        Math.round(item),
        histogramData.initialX + (histogramData.barWidth + histogramData.indent) * i,
        histogramData.histogramHeight - item * step + histogramData.initialY - histogramData.lineHeight
    );
  }

  times.forEach(drawBar);
  names.forEach(typeNames);
  times.forEach(typeTime);
};
