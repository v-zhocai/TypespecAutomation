#!/bin/bash
# linux暂时不调查，后续截图使用该脚本，传入对应的参数即可
echo "Artifact directory: $BUILD_ARTIFACT_STAGING_DIRECTORY"
mkdir -p screenshots
 

start_time=$(date +%s)
 
while true; do

  current_time=$(date +%s)

  elapsed=$((current_time - start_time))
 
  if [ $elapsed -ge 1200 ]; then

    echo "The screenshot has been running for 20 minutes, at which point the task has stopped."

    break

  fi

  timestamp=$(date +%Y%m%d-%H%M%S)

  xwd -root -out "/home/vsts/work/1/a/screenshot_${timestamp}.xwd"

  convert "/home/vsts/work/1/a/screenshot_${timestamp}.xwd" "/home/vsts/work/1/a/screenshot_${timestamp}.png"

  rm "/home/vsts/work/1/a/screenshot_${timestamp}.xwd"
 
  sleep 2

done
 