(function(jwplayer) {
    var template = function(player, config, div) {
        var progressTracker = new VideoProgressTracker({
            progress_percent: config.progress_percent,
            progress_update_url: config.progress_update_url,
            player: player,
            videoDurationCallback: player.getDuration,
            resumeFromLast: config.resume_from_last
        });

        player.onReady(_setup);

        function _setup(event) {
            if(progressTracker.hasProgressUpdateUrl()) {
                player.onTime(_updateProgress);
            }
            if(progressTracker.hasValidOptions()) {
                player.onComplete(_completeUpdate);
                player.onPlay(_initPrevPosition);
                player.onSeek(_onSeek);
            }
        }

        function _updateProgress(event) {
            var current_position = parseInt(event.position);
            progressTracker.updateProgress(current_position);
        }

        function _initPrevPosition(event) {
            progressTracker.initPosition();
        }

        function _completeUpdate(event){
            var duration = parseInt(player.getDuration());
            progressTracker.updateProgress(duration, true);
        }

        function _onSeek(event) {
            if(event.offset) {
                progressTracker.updateProgress(parseInt(event.offset), true);
            }
        }
    };

    jwplayer().registerPlugin('jwplayer_progress', template);
})(jwplayer);
