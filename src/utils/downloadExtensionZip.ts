import JSZip from 'jszip';

const extensionFiles = [
  'manifest.json',
  'background.js',
  'content.js',
  'content.css',
  'popup.html',
  'popup.js',
  'README.md',
  'overlay.html',
  'api-client.js',
  'icons/icon16.png',
  'icons/icon48.png',
  'icons/icon128.png'
];

export const downloadExtensionZip = async (): Promise<void> => {
  try {
    const zip = new JSZip();
    const folder = zip.folder('clarity-extension');
    
    if (!folder) {
      throw new Error('Failed to create zip folder');
    }

    // Fetch all files
    const filePromises = extensionFiles.map(async (filePath) => {
      try {
        const response = await fetch(`/extension/${filePath}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filePath}`);
        }
        
        const blob = await response.blob();
        
        // Add file to zip, preserving folder structure
        folder.file(filePath, blob);
      } catch (error) {
        console.error(`Error fetching ${filePath}:`, error);
        throw error;
      }
    });

    await Promise.all(filePromises);

    // Generate zip file
    const content = await zip.generateAsync({ type: 'blob' });
    
    // Trigger download
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clarity-extension.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error creating extension zip:', error);
    throw error;
  }
};
