function VideoProgressTracker(options) {
    this.progressPercentage = options.progress_percent;
    this.progressUpdateUrl = options.progress_update_url;
    this.prevPosition = 0;
    this.progressDelay = 10;
    this.player = options.player;
    this.videoDurationCallback = options.videoDurationCallback;
    this.resumeFromLast = options.resumeFromLast;
}

VideoProgressTracker.prototype.videoDuration = function () {
    return this.videoDurationCallback.apply(this.player);
}

VideoProgressTracker.prototype.initPosition = function() {
    if(this.prevPosition == 0) {
        this.prevPosition = Math.floor((this.progressPercentage / 100) * this.videoDuration());
    }
    if(this.resumeFromLast == true) {
      this.player.seek(this.prevPosition);
      this.resumeFromLast = false;
    }
};

VideoProgressTracker.prototype.hasValidOptions = function() {
    return this.hasProgressUpdateUrl() && this.progressPercentage < 100;
};

VideoProgressTracker.prototype.hasProgressUpdateUrl = function () {
    return this.progressUpdateUrl != "";
};

VideoProgressTracker.prototype.updateProgress = function(position, force) {
    this.currentPosition = position;
    if((this.currentPosition - this.prevPosition) >= this.progressDelay || force) {
        this.saveProgress();
        this.prevPosition = this.currentPosition;
    }
};

VideoProgressTracker.prototype.saveProgress = function() {
    var self = this;
    new Ajax.Request(this.progressUpdateUrl, {
        method: 'post',
        parameters: {
            video: true,
            previous_position: self.prevPosition,
            current_position: self.currentPosition,
            duration: this.videoDuration()
        }
    });
};
