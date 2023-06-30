import { Utils } from "./Utils";
import { EffectUtils } from "./EffectUtils";

/**
 * ALL functions defined here are visible via the localhost service.
 */
export const host = {
  /**
   * @swagger
   *
   * /kill:
   *      get:
   *          description: This method is only there for debugging purposes.
   *                       For more information, please have a look at the index.js file.
   */
  kill: function () {},

  /*This an example function*/
  /**
   * @swagger
   * /yourNewFunction?param1={param1}&param2={param2}:
   *      get:
   *          description: Your new function, ready to be called!
   *          parameters:
   *              - name: param1
   *                description: Just a sample parameter
   *                in: path
   *                type: string
   *              - name: param2
   *                description: Just another sample parameter
   *                in: path
   *                type: string
   */
  yourNewFunction: function (param1: string, param2: string) {
    alert(param1 + " " + param2);
  },

  /**
   * @swagger
   * /showFunctionName?functionName={functionName}:
   *      get:
   *          description:
   *              A function which display the name you want in the premiere remote window.
   *              This doesn't work on the api-docs page, idk why.
   *          parameters:
   *              - name: functionName
   *                description: The name of the function you want to show
   *                in: path
   *                type: string
   */
  showFunctionName: function (functionName: string) {
    return
  },
  
  /**
   * @swagger
   * /targetAllTracks:
   *      get:
   *          description: Sets the target of all tracks to activated.
  */
 targetAllTracks: function() {
    Utils.targetAllTracks(true);
  },
  
  /**
   * @swagger
   * /untargetAllTracks:
   *      get:
   *          description: Sets the target of all tracks to deactivated.
  */
  untargetAllTracks: function() {
    Utils.targetAllTracks(false);
  },

  /**
   * @swagger
   * /targetTracks?videoTrack={videoTrack}&audioTrack={audioTrack}:
   *      get:
   *          description: Untargets all tracks. Then, only targets the specified tracks.
   *          parameters:
   *              - name: videoTrack
   *                description: the single video track to target (starting at 1)
   *                in: path
   *                type: number
   *              - name: audioTrack
   *                description: the single audio track to target (starting at 1)
   *                in: path
   *                type: number
   */
  targetTracks: function(videoTrack: string, audioTrack: string) {
    Utils.targetTracks(parseInt(videoTrack) - 1, parseInt(audioTrack) - 1);
  },

  /**
   * @swagger
   * /applyBlurPreset:
   *      get:
   *          description: Applies the custom tweaked gaussian blur effect on all the selected clips.
   */
  applyBlurPreset: function() {
    EffectUtils.applyBlurEffect();
  },
  
  /**
   * @swagger
   * /applyDropShadowPreset:
   *      get:
   *          description: Applies the custom tweaked drop shadow effect on all the selected clips.
   */
  applyDropShadowPreset: function() {
    EffectUtils.applyDropShadowPreset();
  },
  
  /**
   * @swagger
   * /applyWarpStabilizer:
   *      get:
   *          description: Applies the warp stabilizer effect on all the selected clips.
   */
  applyWarpStabilizer: function() {
    EffectUtils.applyWarpStabilizer();
  },

  /**
   * @swagger
   * /setZoom:
   *      get:
   *          description: Sets the scale of the selected clips to any percent.
   *          parameters:
   *              - name: zoom
   *                description: the value of the zoom
   *                in: path
   *                type: number
  */
  setZoom: function(zoom) {
    EffectUtils.setZoom(parseInt(zoom));
  }
};

/**
 * This function is only used internally.
 */
export const framework = {
  enableQualityEngineering: function() {
    app.enableQE();
  }
};
