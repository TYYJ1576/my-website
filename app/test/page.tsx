'use client'

import { EB_Garamond } from 'next/font/google'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Image from 'next/image'
import ProjectTitle from '@/components/projects/ProjectTitle'
import SectionTitle from '@/components/projects/SectionTitle'
import YoutubePlayer from '@/components/projects/YoutubePlayer'
import Paragraph from '@/components/projects/Paragraph'
import CodeBlock from '@/components/projects/CodeBlock'
import ImageBlock from '@/components/projects/ImageBlock'

const ebGaramondFont = EB_Garamond({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-garamond',
})

function TestPage() {
  return (
    <main
      className={`mx-auto max-w-5xl px-4 sm:px-8 lg:px-16 ${ebGaramondFont.variable}`}
    >
      <ProjectTitle title="Implementation of LPSNet for Semantic Segmentation with MMSegmentation" />
      <div className="px-8">
        <section>
          <Paragraph contents="[Lightweight and Progressively-Scalable Scalable Network (LPSNet)](https://arxiv.org/abs/2207.13600) is a lightweight convolutional neural network architecture designed for network size scalability which allow models to adapt to different resource constraints. The mechanism of the progressively scalable network helps the decision of trade-offs between computational cost and segmentation accuracy. [MMSegmentation](https://github.com/open-mmlab/mmsegmentation) is a highly modularized and well-documented framework that supports a wide range of semantic segmentation models. It also provides various evaluation tools for model built with MMSegmentation framework. Here is a demonstration of reproduce LPSNet with the MMSegmentation framework. The demonstration is on a linux system." />
        </section>
        <section>
          <h2 className="text-[27px] font-bold leading-9 sm:leading-13 mt-6 sm:mt-8">
            Installation of Miniconda3
          </h2>
          <div className="ml-4">
            <p className="text-2xl font-normal leading-7 sm:leading-8 mt-6 sm:mt-8 font-p">
              Create installation directory and download installer
            </p>
            <CodeBlock
              language="bash"
              code={`mkdir -p ~/miniconda3
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O 
~/miniconda3/miniconda.sh`}
            />
            <p className="text-2xl font-normal leading-7 sm:leading-8 mt-6 sm:mt-8 font-p">
              Silent install to ~/miniconda3
            </p>
            <SyntaxHighlighter language="bash" style={oneLight}>
              {`bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-7 sm:leading-8 mt-6 sm:mt-8 font-p">
              Remove installer
            </p>
            <SyntaxHighlighter language="bash" style={oneLight}>
              {`rm ~/miniconda3/miniconda.sh`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-7 sm:leading-8 mt-6 sm:mt-8 font-p">
              Activate base environment
            </p>
            <SyntaxHighlighter language="bash" style={oneLight}>
              {`source ~/miniconda3/bin/activate`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-7 sm:leading-8 mt-6 sm:mt-8 font-p">
              Initialize conda for all shells
            </p>
            <SyntaxHighlighter language="bash" style={oneLight}>
              {`conda init --all`}
            </SyntaxHighlighter>
          </div>
        </section>
        <section>
          <h2 className="text-[27px] font-bold leading-9 sm:leading-13 mt-6 sm:mt-8">
            Installation of MMSegmentation
          </h2>
          <div className="ml-4">
            <p className="text-2xl font-normal leading-7 sm:leading-8 mt-6 sm:mt-8 font-p">
              Install OpenMIM, a package manager for OpenMMLab projects.
            </p>
            <SyntaxHighlighter language="bash" style={oneLight}>
              {`pip install -U openmim`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-7 sm:leading-8 mt-6 sm:mt-8 font-p">
              Install PyTorch. Website for other version:{' '}
              <a
                href="https://pytorch.org/get-started/previous-versions/"
                className="text-blue-700 hover:underline"
              >
                Installing previous versions of PyTorch
              </a>
            </p>
            <SyntaxHighlighter language="bash" style={oneLight}>
              {`pip install torch==1.13.1+cu117 torchvision==0.14.1+cu117 --extra-index-url https://download.pytorch.org/whl/cu117`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-7 sm:leading-8 mt-6 sm:mt-8 font-p">
              Use OpenMIM to install MMEngine MMCV, the foundational training
              library for OpenMMLab and the OpenMMLab computer vision core
              library
            </p>
            <SyntaxHighlighter language="bash" style={oneLight}>
              {`mim install mmengine
mim install "mmcv>=2.0.0"`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-7 sm:leading-8 mt-6 sm:mt-8 font-p">
              Clone the MMSegmentation repository from GitHub and install
              required dependencies.
            </p>
            <SyntaxHighlighter language="bash" style={oneLight}>
              {`git clone -b main https://github.com/open-mmlab/mmsegmentation.git
cd mmsegmentation
pip install -v -e .`}
            </SyntaxHighlighter>
          </div>
        </section>
        <section>
          <h2 className="text-[27px] font-bold leading-9 sm:leading-13 mt-6 sm:mt-8">
            Backbone
          </h2>
          <div className="ml-4">
            <ImageBlock
              src="https://firebasestorage.googleapis.com/v0/b/my-website-88059.firebasestorage.app/o/Screenshot%202025-06-24%20002104.png?alt=media&token=5a6c4a23-a657-4ed5-a9ea-a2f749f811f0"
              alt="LPSNet Backbone"
            />
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              The architecture of LPSNet is designed with flexibility in mind
              and can be scaled along three main dimensions: the number of
              convolutional blocks (depth), the number of channels (width), and
              the input image scaling for each network path (resolution). The
              model adopts a multi-path design, where the original input image
              is resized to three different resolutions. Each resized image is
              then processed through its corresponding path within the network,
              allowing LPSNet to effectively capture both global context and
              fine-grained details.
            </p>
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              Within each path, the network is organized into five stages, and
              each stage consists of several convolutional blocks. All the
              convolutional blocks within the same stage use the same number of
              filters, which helps maintain consistency in feature extraction at
              each level.
            </p>
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              In the first four stages, the initial convolutional block in each
              stage reduces the spatial dimensions of the feature maps. This
              progressive downsampling helps to decrease the computational
              requirements as the network goes deeper and enables the extraction
              of more abstract and comprehensive features.
            </p>
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              Starting from the third stage, interaction modules are introduced
              between the different paths. These modules allow the network to
              combine information from both high-resolution and low-resolution
              feature maps. By integrating detailed and global features from
              multiple paths, LPSNet can achieve better performance in semantic
              segmentation tasks.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-[27px] font-bold leading-9 sm:leading-13 mt-6 sm:mt-8">
            LPSNet Backbone in MMSegmentation
          </h2>
          <div className="ml-4">
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              Naviagate to the model folder under /mmseg/models/backbones and
              create a new backbone
            </p>
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              LPSNet main building block. Supports flexible selection of
              convolution module types and multi-path scaling.
            </p>
            <SyntaxHighlighter language="python" style={oneLight}>
              {`
from functools import partial
import torch
import torch.nn as nn
import torch.nn.functional as F
from mmseg.registry import MODELS
from mmcv.cnn import ConvModule
from mmengine.model import BaseModule
import math

@MODELS.register_module()
class LPSNet_Block(BaseModule):
    def __init__(
        self,
        depths,
        channels,
        scale_ratios,
        in_channels=3,
        conv_type='separable',  # Selectable convolution type
        init_cfg=[
            dict(type='Kaiming', layer='Conv2d'),
            dict(type='Constant', val=1, layer=['BatchNorm2d', 'SyncBatchNorm'])
        ],
    ):
        super().__init__(init_cfg)

        self.depths = depths  # Number of blocks per stage
        self.channels = channels  # Number of channels per stage
        self.scale_ratios = [r for r in scale_ratios if r > 0]  # Only use valid ratios (>0)
        self.in_channels = in_channels
        self.conv_type = conv_type

        self.num_paths = len(self.scale_ratios)
        self.num_blocks = len(depths)

        # Ensure depths and channels match in length
        if self.num_blocks != len(self.channels):
            raise ValueError(
                f"Expected depths and channels to have the same length, "
                f"but got {self.num_blocks} and {len(self.channels)}"
            )

        # Build network branches (paths), one for each scale ratio
        self.nets = nn.ModuleList(
            [self._build_path() for _ in range(self.num_paths)]
        )
`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              Build a single path (branch) of the network, consisting of
              multiple stages (blocks).
            </p>
            <SyntaxHighlighter language="python" style={oneLight}>
              {`
  def _build_path(self):
      path = []
      c_in = self.in_channels
      for b, (d, c) in enumerate(zip(self.depths, self.channels)):
          blocks = []
          for i in range(d):
              # In the first block of each stage (except last), stride=2 for downsampling
              stride = 2 if (i == 0 and b != self.num_blocks - 1) else 1
              # Select convolution type based on configuration
              if self.conv_type == 'separable':
                  blocks.append(
                      SeparableConvModule(
                          in_channels=c_in if i == 0 else c,
                          out_channels=c,
                          kernel_size=3,
                          padding=1,
                          stride=stride,
                          bias=False,
                          norm_cfg=dict(type='BN'),
                          act_cfg=dict(type='ReLU'),
                      )
                  )
              elif self.conv_type == 'standard':
                  blocks.append(
                      ConvModule(
                          in_channels=c_in if i == 0 else c,
                          out_channels=c,
                          kernel_size=3,
                          padding=1,
                          stride=stride,
                          bias=False,
                          norm_cfg=dict(type='BN'),
                          act_cfg=dict(type='ReLU'),
                      )
                  )
              elif self.conv_type == 'residual':
                  blocks.append(
                      ResidualBlock(
                          in_channels=c_in if i == 0 else c,
                          out_channels=c,
                          stride=stride
                      )
                  )
              elif self.conv_type == 'bottleneck':
                  blocks.append(
                      BottleneckBlock(
                          in_channels=c_in if i == 0 else c,
                          out_channels=c,
                          stride=stride
                      )
                  )
              elif self.conv_type == 'ghost':
                  blocks.append(
                      GhostModule(
                          in_channels=c_in if i == 0 else c,
                          out_channels=c,
                          stride=stride
                      )
                  )
              elif self.conv_type == 'inverted_residual':
                  blocks.append(
                      InvertedResidualBlock(
                          in_channels=c_in if i == 0 else c,
                          out_channels=c,
                          stride=stride
                      )
                  )
              elif self.conv_type == 'shufflenet':
                  blocks.append(
                      ShuffleNetUnit(
                          in_channels=c_in if i == 0 else c,
                          out_channels=c,
                          stride=stride
                      )
                  )
              else:
                  raise ValueError(f"Unsupported convolution type: {self.conv_type}")
              c_in = c  # Update input channel for next block
          path.append(nn.Sequential(*blocks))
      return nn.ModuleList(path)
`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              For each scale ratio, resize the input tensor accordingly.
            </p>
            <SyntaxHighlighter language="python" style={oneLight}>
              {`
  def _preprocess_input(self, x):
      h, w = x.shape[-2:]  # Original height and width
      h_tensor = torch.tensor(h, dtype=torch.float32)
      w_tensor = torch.tensor(w, dtype=torch.float32)

      # Resize input for each path according to its scale ratio
      return [
          _interpolate(
              x,
              size=(
                  torch.floor(r * h_tensor).to(dtype=torch.int64),
                  torch.floor(r * w_tensor).to(dtype=torch.int64)
              )
          )
          for r in self.scale_ratios
      ]
`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              Forward pass of LPSNet_Block: Preprocess input for each path,
              Apply convolutional blocks up to the interaction point. - Perform
              multi-path interaction across paths, Continue processing using
              subsequent blocks, Upsample all features to the same size and
              concatenate.
            </p>
            <SyntaxHighlighter language="python" style={oneLight}>
              {`
  def forward(self, x, interact_begin_idx=2):
      # Resize input for each path
      inputs = self._preprocess_input(x)
      feats = []
      # Initial processing for each path up to the interaction stage
      for path, inp in zip(self.nets, inputs):
          x_path = inp
          for idx in range(interact_begin_idx + 1):
              x_path = path[idx](x_path)
          feats.append(x_path)

      # Multi-path interaction and further block processing
      for idx in range(interact_begin_idx + 1, self.num_blocks):
          feats = _multipath_interaction(feats)
          feats = [
              path[idx](feat) for path, feat in zip(self.nets, feats)
          ]

      # After processing, upsample all outputs to match the first path's size
      size = feats[0].shape[-2:]
      feats = [_interpolate(feat, size=size) for feat in feats]

      # Concatenate all path outputs along the channel dimension
      out = torch.cat(feats, dim=1)

      # Return as a list (for mmseg compatibility)
      return [out]
`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              Initialize model weights using Kaiming initialization for Conv2d,
              and set BatchNorm weights and bias appropriately.
            </p>
            <SyntaxHighlighter language="python" style={oneLight}>
              {`
  def init_weights(self):
      super().init_weights()
      for m in self.modules():
          if isinstance(m, nn.Conv2d):
              nn.init.kaiming_normal_(
                  m.weight, mode='fan_out', nonlinearity='relu'
              )
              if m.bias is not None:
                  nn.init.constant_(m.bias, 0)
          elif isinstance(m, (nn.BatchNorm2d, nn.SyncBatchNorm)):
              nn.init.constant_(m.weight, 1)
              nn.init.constant_(m.bias, 0)
`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              Implements the multi-path interaction mechanism. For each feature
              in the list, add upsampled features from all other paths to
              promote information sharing.
            </p>
            <SyntaxHighlighter language="python" style={oneLight}>
              {`
def _multipath_interaction(feats):
    length = len(feats)
    if length == 1:
        return feats
    sizes = [x.shape[-2:] for x in feats]  # Collect spatial sizes of each path's features
    outs = []
    indices = list(range(length))
    for i, s in enumerate(sizes):
        out = feats[i]
        for j in filter(lambda x: x != i, indices):
            # Upsample other path's feature to current path's size and add
            out = out + _interpolate(feats[j], size=s)
        outs.append(out)
    return outs
`}
            </SyntaxHighlighter>
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              SeparableConvModule
            </p>
            <SyntaxHighlighter language="python" style={oneLight}>
              {`
class SeparableConvModule(nn.Module):
    def __init__(
        self,
        in_channels,
        out_channels,
        kernel_size=3,
        stride=1,
        padding=1,
        bias=False,
        norm_cfg=dict(type='BN'),
        act_cfg=dict(type='ReLU'),
    ):
        super(SeparableConvModule, self).__init__()

        # Depthwise convolution
        self.depthwise = nn.Conv2d(
            in_channels,
            in_channels,
            kernel_size=kernel_size,
            stride=stride,
            padding=padding,
            groups=in_channels,  # Groups set to in_channels for depthwise convolution
            bias=bias
        )

        # Pointwise convolution
        self.pointwise = nn.Conv2d(
            in_channels,
            out_channels,
            kernel_size=1,
            bias=bias
        )

        # Normalization layer
        if norm_cfg is not None:
            self.norm = nn.BatchNorm2d(out_channels)
        else:
            self.norm = None

        # Activation layer
        if act_cfg is not None:
            self.activation = nn.ReLU(inplace=True)
        else:
            self.activation = None
`}
            </SyntaxHighlighter>
          </div>
        </section>
        <section>
          <h2 className="text-[27px] font-bold leading-9 sm:leading-13 mt-6 sm:mt-8">
            Configuration Files
          </h2>
          <div className="ml-4">
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              As mentioned before, MMSegmentation framework is highly modalized.
              All the setting up required to train, valid and test a semantic
              segmentation model can be defined quickly in the configuration
              file which makes it particularly important for MMSegmentation
              frameworks.
            </p>
            <p className="text-2xl font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
              One of the most important part for configuration of training is
              the model configuration. It helps to register the required network
              and provide important parameter for setting up the network. To do
              that, a LPS-Net model configuration file is placed under the
              folder mmsegmentation/configs/_base_/models. In the file, the type
              of backbone is set to the customized LPS-Net backbone and then
              provide the required parameters for LPS-Net including channels,
              depths and scale_ratios. Moreover, register a decode head and set
              the input channels to the total number of output channels of the
              backbone. In the decode head, several loss functions can be used.
              In this thesis, CrossEntropyLoss, DiceLoss and Combination of
              CrossEntropyLoss and DiceLoss are used for the comparison.
            </p>
            <SyntaxHighlighter language="python" style={oneLight}>
              {`
norm_cfg = dict(type='SyncBN', requires_grad=True)
data_preprocessor = dict(
    type='SegDataPreProcessor',
    mean=[123.675, 116.28, 103.53],
    std=[58.395, 57.12, 57.375],
    size=(1536, 768),
    bgr_to_rgb=True,
    pad_val=0,
    seg_pad_val=255)

model = dict(
    type='EncoderDecoder',
    data_preprocessor=data_preprocessor,
    backbone=dict(
        type='LPSNet',
        in_channels=3,
        depths=[1, 3, 3, 10, 10],
        channels=[8, 24, 48, 96, 96],
        scale_ratios=[1.0, 0.25],
        conv_type='constant',
        init_cfg=[
            dict(type='Kaiming', layer='Conv2d'),
            dict(type='Constant', val=1, bias=0, layer=['BatchNorm2d', 'SyncBatchNorm'])
        ]
    ),
    decode_head=dict(
        type='FCNHead',
        in_channels=96 * 2,  # channels[-1] * num_paths
        in_index=0,
        channels=96 * 2,
        num_convs=1,
        concat_input=False,
        dropout_ratio=0.1,
        num_classes=19,
        norm_cfg=norm_cfg,
        align_corners=False,
        loss_decode=dict(
            type='CrossEntropyLoss',
            use_sigmoid=False,
            loss_weight=1.0
        ),

        # Add the OHEMPixelSampler
        sampler=dict(
            type='OHEMPixelSampler',
            thresh=0.7,
            min_kept=10000,
        ),
    ),
    # model training and testing settings
    train_cfg=dict(),
    test_cfg=dict(mode='whole'))
`}
            </SyntaxHighlighter>
          </div>
        </section>
        <section>
          <SectionTitle title="Training" />
          <div className="ml-4">
            <Paragraph contents="Single GPU Training" />
            <CodeBlock
              language="Bash"
              code={`python tools/tran.py configs/{config file} --work-dir {position to store the traning results}`}
            />
            <Paragraph contents="Multi GPUs Training" />
            <CodeBlock
              language="Bash"
              code={`bash tools/dist_test.sh configs/{config file} {GPUs} --work-dir {position to store the traning results}`}
            />
          </div>
        </section>
        <section>
          <SectionTitle title="Result Demonstration" />
          <YoutubePlayer url="https://www.youtube.com/watch?v=jDDygaf0wSA" />
        </section>
      </div>
    </main>
  )
}
export default TestPage
