import { Utils } from "./Utils";

export class EffectUtils {
  static applyEffectOnSelection(effectName: String) {
    Utils.applyFunctionOnSelectedClips(true, (QEclip, clip: TrackItem) => {
      var effect = qe.project.getVideoEffectByName(effectName);
      QEclip.addVideoEffect(effect);
    });
  }
  
  static setZoom(zoom: number) {
    Utils.applyFunctionOnSelectedClips(true, (clip: TrackItem) => {
      const scaleInfo = clip.components[1].properties[1];
      scaleInfo.setValue(zoom, true);
    }, false);
  }

  static applyBlurEffect() {
    Utils.applyFunctionOnSelectedClips(true, (QEclip, clip: TrackItem) => {
      var effect = qe.project.getVideoEffectByName("Flou gaussien");
      QEclip.addVideoEffect(effect);
      var blurEffectProperties = clip.components[2].properties;
      var blurriness = blurEffectProperties[0];
      var repeatBorderPixels = blurEffectProperties[2];
  
      blurriness.setValue(42, true);
      repeatBorderPixels.setValue(true, true);
    });
  }

  static applyDropShadowPreset() {
    Utils.applyFunctionOnSelectedClips(true, (QEclip, clip: TrackItem) => {
      var effect = qe.project.getVideoEffectByName("Ombre portée");
      QEclip.addVideoEffect(effect);
      var shadowEffectProperties = clip.components[2].properties;
      const opacity = shadowEffectProperties[1];
      const softness = shadowEffectProperties[4];

      opacity.setValue(255, true);
      softness.setValue(44, true);
    });
  }

  static applyWarpStabilizer() {
    this.applyEffectOnSelection("Stabilisation");
  }
}
