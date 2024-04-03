import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,

});

const BoxContainer = styled(Box)({
  border: "1px dashed",
  borderColor: '#1976D2',
  borderRadius: 4,
  padding: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 150,
  width: "100%",
});

const BoxPreview = styled(Box)({
  maxWidth: '100%',
  maxHeight: 200,
  borderRadius: 4,
  overflow: 'hidden',
  margin: '16px 0',
});

const ButtonUpload = styled(Button)({
  marginTop: 'auto',

});

export default function InputFileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showButton, setShowButton] = useState(true);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setSelectedFile(file);
      setShowButton(false);
    }
  };

  const renderPreview = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        return (
          <BoxPreview>
            <img src={reader.result as string} alt="Preview" />
          </BoxPreview>
        );
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <BoxContainer>
      {renderPreview()}
      {showButton && (
        <ButtonUpload
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </ButtonUpload>
      )}
    </BoxContainer>
  );
}
