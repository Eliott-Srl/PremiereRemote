import { EffectUtils } from "./EffectUtils";

export class Utils {
  static applyFunctionOnSelectedClips(video: boolean, func: Function, UseEQ?: boolean) {
    // Get the sequence from the app
    var VanillaSequence = app.project.activeSequence;
    // verify that a sequence is open
    if (VanillaSequence) {
        // Get the sequence from the QE
        var QESequence = qe.project.getActiveSequence();
        if (video) {
            // Get the video tracks if true
            var tracks = VanillaSequence.videoTracks;
        } else {
            // Get the audio tracks if false
            var tracks = VanillaSequence.audioTracks;
        }
        // Check if the user wants functions from EQ
        if (typeof UseEQ === 'undefined') {
          /* If it's the case, the function is so much longer because it keeps
          track of the two types of clips.
          */
          // Iterate into the tracks
          for(var trackIndex = 0; trackIndex < tracks.numTracks; trackIndex++) {
            // Do the code only if the actual track is selected
            if (tracks[trackIndex].isTargeted()) {
              // Get the QE actual track
              var QETrack = QESequence.getVideoTrackAt(trackIndex);
              /* This whitespaceCounter is important because QEtrack consider the
              holes on the track as an empty clip. Whereas VanillaTrack does NOT
              consider it as as a clip.
              So the number of clips in the timelines are different.
              The whitespaceCounter count the whitespaces so we keep track of the
              differences of the 2 timelines.
              This method is useful because it prevents making another forloop which
              can really slow down the function !
              */
              var whitespaceCounter = 0;
              // Iterate into the clips
              for(var clipIndex = 0; clipIndex < QETrack.numItems; clipIndex++) {
                // Check if the clip isn't empty
                if(QETrack.getItemAt(clipIndex).type.toString() != "Empty") {
                  // Get the QEclip if it isn't 
                  var QEClip = QETrack.getItemAt(clipIndex);
                  /*This is where whitespaceCounter is used, find the good clip
                  Without doing another forloop
                  */
                  var VanillaClip = tracks[trackIndex].clips[clipIndex - whitespaceCounter];
                  // Check if the clip exist
                  if(VanillaClip == null) {
                    alert("Error, the clip can't be empty")
                    return
                  }
                  // Check if the clip is selected
                  if(VanillaClip.isSelected() == true) {
                    // Apply the parameter function if it is
                    func(QEClip, VanillaClip);
                    // Check if the selection contain only one element
                    // idk if this optimization is useful
                    if (VanillaSequence.getSelection().length === 1) {
                      // If it does, stop the function because it's finished
                      return;
                    }
                  }
                // Incremente the whitespaceCounter if the clip is empty
                } else {
                  whitespaceCounter++;
                }
              }
            }
          }
        /* If the user don't want EQ, the function is so much simpler because the Vanilla
        sequence has a method wich returns a list of vanilla clips.
        */
        } else {
          for (let clipIndex = 0; clipIndex < VanillaSequence.getSelection().length; clipIndex++) {
            const clip = VanillaSequence.getSelection()[clipIndex];
            func(clip);
          }
        }
        // Do an alert if there is no active sequence
    } else {
      alert("No active sequence.");
    }
  }

  //This function isn't really finished and I don't use it so ¯\_(ツ)_/¯
  static getSelectedClips(video: boolean, func: Function) {
    // Get the sequence from the app
    var VanillaSequence = app.project.activeSequence;
    // verify that a sequence is open
    if (VanillaSequence) {
      // Get the sequence from the QE
      var QESequence = qe.project.getActiveSequence();
      if (video) {
          // Get the video tracks if true
          var tracks = VanillaSequence.videoTracks;
      } else {
          // Get the audio tracks if false
          var tracks = VanillaSequence.audioTracks;
      }
      // Create a list which will be returned containing the clips
      var selectedClips = [];
      // Iterate into the tracks
      for(var trackIndex = 0; trackIndex < tracks.numTracks; trackIndex++) {
          // Do the code only if the actual track is selected
          if (tracks[trackIndex].isTargeted()) {
              // Get the QE actual track
              var QETrack = QESequence.getVideoTrackAt(trackIndex);
              /* This whitespaceCounter is important because QEtrack consider the
                  holes on the track as an empty clip. Whereas VanillaTrack does NOT
                  consider it as as a clip.
                  So the number of clips in the timelines are different.
                  The whitespaceCounter count the whitespaces so we keep track of the
                  differences of the 2 timelines.
                  This method is useful because it prevents making another forloop which
                  can really slow down the function !
              */
              var whitespaceCounter = 0;
              // Iterate into the clips
              for(var clipIndex = 0; clipIndex < QETrack.numItems; clipIndex++) {
                  // Check if the clip isn't empty
                  if(QETrack.getItemAt(clipIndex).type.toString() != "Empty") {
                      // Get the QEclip if it isn't 
                      var QEClip = QETrack.getItemAt(clipIndex);
                      /*This is where whitespaceCounter is used, find the good clip
                        Without doing another forloop
                      */
                      var VanillaClip = tracks[trackIndex].clips[clipIndex - whitespaceCounter];
                      // Check if the clip exist
                      if(VanillaClip == null) {
                        alert("Error, the clip can't be empty")
                        return
                      }
                      // Check if the clip is selected
                      if(VanillaClip.isSelected() == true) {
                        //If it is, the QEclip and the VanillaClip are added to the list,
                        //so we can use them later without limitations.
                        selectedClips.push([QEClip, VanillaClip]);
                        // Check if the selection contain only one element
                        // idk if this optimization is useful
                        if (VanillaSequence.getSelection().length === 1) {
                          // If it does, stop the function because it's finished
                          return;
                        }
                      }
                      // Incremente the whitespaceCounter if the clip is empty
                  } else {
                    whitespaceCounter++;
                  }
              }
          }
      }
      return selectedClips;
    // Do an alert if there is no active sequence
    } else {
      alert("No active sequence.");
    }
  }

  //I haven't coded from here, it's from sebinside, the owner of the reporitory
  static targetAllTracks(target: boolean) {
    const currentSequence = app.project.activeSequence;
    for(let i = 0; i < currentSequence.videoTracks.numTracks; i++) {
      currentSequence.videoTracks[i].setTargeted(target, true)
    }
    for(let i = 0; i < currentSequence.audioTracks.numTracks; i++) {
      currentSequence.audioTracks[i].setTargeted(target, true)
    }
  }

  static targetTracks(videoTrack: number, audioTrack: number) {
    this.targetAllTracks(false);

    const currentSequence = app.project.activeSequence;
    
    if(currentSequence.videoTracks.numTracks > videoTrack) {
      currentSequence.videoTracks[videoTrack].setTargeted(true, true);
    }
    if(currentSequence.audioTracks.numTracks > audioTrack) {
      currentSequence.audioTracks[audioTrack].setTargeted(true, true);
    }
  }

  static zoomToFit() {
    // Get the sequence from the app
    var VanillaSequence = app.project.activeSequence;
    // verify that a sequence is open
    if (VanillaSequence) {
      Utils.applyFunctionOnSelectedClips(true, (clip: TrackItem) => {
        const clipSize = this.getClipSize(clip);
        const frameHeight = VanillaSequence.frameSizeVertical;
        const frameWidth = VanillaSequence.frameSizeHorizontal;

        const verticalFactor = frameHeight / clipSize.height;
        const horizontalFactor = frameWidth / clipSize.width;

        const zoomLevel = Math.max(verticalFactor, horizontalFactor) * 100;

        EffectUtils.setZoom(zoomLevel);
      }, false);
    // Do an alert if there is no active sequence
    } else {
      alert("No active sequence.");
    }
  }

  static getClipSize(videoClip: TrackItem) {
    const projectItem = videoClip.projectItem;
    const videoInfo = Utils.getProjectMetadata(projectItem, 
      ["Column.Intrinsic.VideoInfo"])[0][0].toString();

    const width = parseInt(videoInfo.split(' ')[0]);
    const height = parseInt(videoInfo.split(' ')[2]);
    return {"height": height, "width": width}
  }

  static getProjectMetadata(projectItem: ProjectItem, fieldNames) {
    // Based on: https://community.adobe.com/t5/premiere-pro/get-image-size-in-jsx/td-p/10554914?page=1&profile.language=de
    const kPProPrivateProjectMetadataURI ="http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";
    if (app.isDocumentOpen()) {
        if (projectItem) {
            if (ExternalObject.AdobeXMPScript === undefined) {
                ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
            }
            if (ExternalObject.AdobeXMPScript !== undefined) {
                let retArray = [];
                let retArray2 = [];
                const projectMetadata = projectItem.getProjectMetadata();
                let xmp = new XMPMeta(projectMetadata);
                for (let pc = 0; pc < fieldNames.length; pc++) {
                    if (xmp.doesPropertyExist(kPProPrivateProjectMetadataURI, fieldNames[pc])) {
                        retArray.push([fieldNames[pc],xmp.getProperty(kPProPrivateProjectMetadataURI, fieldNames[pc])]);
                        retArray2.push([xmp.getProperty(kPProPrivateProjectMetadataURI,fieldNames[pc])]);
                    }
                }
                return retArray2;
            }
        }
    }
  }
}
