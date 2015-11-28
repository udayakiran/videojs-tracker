# videojs-tracker

A videojs  (version 4.12.7 but works with version 3.x.x and 4.x.x) plugin to track the below information session by session.

- Progress
- Time spent on the video in any session
- video length
- Browser/Device (not included in params. Just read "user-agent" header of each request)

- Also, lets you resume from the video from the last left point if you choose to.

## Sample Usage

1. Download vjs_tracker.js OR vjs_tracker.min.js

2. Include needed files in your HTML page

```
<script src="video.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
<script src="vjs_tracker.js"></script>
```
3. Configure the plugin while initializing the player.

```
<script type="text/javascript">
     jQuery(document).ready(function () {
        videojs("#example_video_1").ready(function () {
          var myPlayer = this;
          new VjsTracker(myPlayer,
                  {
                    url: '/',
                    progress: 25,
                    resume_from_last: true,
                    debug: true,
                    frequency: 5,
                  });

        });
      });    </script>
```

Please check examples/tracker.html for sample configuration.

## Config Options

| Option | Explanation |
| ----- | ---- |
| url | The URL on your app to which progress needs to be updated to. (This field is required) |
| progress | The initial progress percentage (probably the progress in the previous session.) |
| resume_from_last | Should the playback start from the last left place? (true/false - default is false). The playback resumes based on 'progress' field's value. |
| frequency | How frequently the progress info should be sent to the url (default - 10 ie every 10 secs) |
| progress_only | If set to true, only progress info is sent to server and it is sent only when there is some progress made. (true/false - default is false). Use this if you only want progress but not session time spent. |

## Information Received By Server 

```
    { session_id: ,
    previous_position: ,
    current_position: ,
    progress: ,
    video_duration: ,
    total_session_duration:}

```
| Param | Explanation |
| ----- | ---- |
| session_id | A globally unique session id string that helps to identify and store data per session. Every time the video player gets launched, a new session id gets created. |
| previous_position | The position of the video controlbar when last update happend (in secs) |
| current_position | The position of the video controlbar at present (in secs) |
| progress | The overall percentage of video is watched so far (percentage | max value is 100). This just means the highest point in the timeline so far. |
| video_duration | Total video length (in secs) |
| total_session_duration | Total amount of time spent watched in this session (in secs.). This is culumative and calcualtes the replays, seeking back and etc. |

## Tips

- It has been observed that with the open source streaming tools we use, on a rare occasion streaming fails and the player receives huge numbers as video duration. To avoid this, it's adviced to store the video duration in the DB on server.
- 'progress' can be calculated using 'previous_position', 'current_position' and 'video_duration' fields on the server as well. Just take care that it never exceeds 100 and cant be negative.


## Contributing

Please help with your contribution by filing any issues if found. Pull requests are welcomed :)
