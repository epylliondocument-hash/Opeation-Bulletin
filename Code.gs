// Google Apps Script – stores all data of "SMV & Operation Master" as one JSON file in YOUR Google Drive.
// 1. Change KEY to your own secret text (use the same text in index.html).
// 2. Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone.
const KEY='a8475f54334803a7bdf4ac14';
const FILE_NAME='smv_master_db.json';

// Uses the newest copy of the file that is not in the Trash; creates an empty one if none exists.
function file_(){
  const it=DriveApp.getFilesByName(FILE_NAME);let best=null;
  while(it.hasNext()){const f=it.next();if(f.isTrashed())continue;if(!best||f.getLastUpdated()>best.getLastUpdated())best=f}
  return best||DriveApp.createFile(FILE_NAME,JSON.stringify({v:0,c:{}}),'application/json');
}
function load_(){return JSON.parse(file_().getBlob().getDataAsString())}
function out_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}

function doGet(e){
  if(e.parameter.key!==KEY)return out_({error:'wrong key'});
  const d=load_();
  if(e.parameter.v&&Number(e.parameter.v)===d.v)return out_({v:d.v,same:true});
  return out_(d);
}

function doPost(e){
  const b=JSON.parse(e.postData.contents);
  if(b.key!==KEY)return out_({error:'wrong key'});
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
    const d=load_();d.c=d.c||{};d.c[b.col]=d.c[b.col]||{};
    if(b.action==='set')d.c[b.col][b.id]=b.data;
    else if(b.action==='del')delete d.c[b.col][b.id];
    d.v=(d.v||0)+1;
    file_().setContent(JSON.stringify(d));
    return out_({ok:true,v:d.v});
  }finally{lock.releaseLock()}
}
